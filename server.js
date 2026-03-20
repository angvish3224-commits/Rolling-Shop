const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static(__dirname)); // Используем __dirname для надежности

// Настройка почтового транспорта
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'smol.rollingmoto@gmail.com',
        pass: 'kico dvzn jivp bzyh'
    }
});

// Проверка соединения с почтой
transporter.verify((error, success) => {
    if (error) {
        console.log('❌ Ошибка подключения к почте:', error);
    } else {
        console.log('✅ Почтовый сервер готов к отправке писем');
    }
});

// Вспомогательные функции
function getPaymentMethodText(method) {
    const methods = {
        'credit': 'Кредит',
        'installment': 'Рассрочка',
        'transfer': 'Банковский перевод'
    };
    return methods[method] || method;
}

function getStatusText(status) {
    const statusMap = {
        'pending': 'В обработке',
        'processing': 'В обработке',
        'completed': 'Выполнен',
        'cancelled': 'Отменен'
    };
    return statusMap[status] || status;
}

// Маршрут для главной страницы
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Маршрут для страницы Kayo
app.get('/kayo.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'kayo.html'));
});

// Маршрут для отправки заказа
app.post('/api/send-order', async (req, res) => {
    try {
        console.log('📨 Получен запрос на отправку заказа');
        const order = req.body;
        
        console.log('📦 Данные заказа:', {
            id: order.id,
            customer: order.customer?.name,
            items: order.items?.length,
            total: order.total
        });

        // Проверяем обязательные поля
        if (!order.id || !order.customer || !order.items || !order.total) {
            console.log('❌ Неполные данные заказа');
            return res.status(400).json({
                success: false,
                message: 'Неполные данные заказа'
            });
        }

        const mailOptions = {
            from: '"RollingMoto" <smol.rollingmoto@gmail.com>',
            to: 'smol.rollingmoto@gmail.com',
            replyTo: order.customer.email,
            subject: `🛵 Новый заказ #${order.id} - RollingMoto`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
                    <div style="background: linear-gradient(135deg, #ffae00, #ff8c00); padding: 20px; text-align: center; color: white;">
                        <h1 style="margin: 0;">🛵 RollingMoto</h1>
                        <p style="margin: 10px 0 0; font-size: 18px;">Новый заказ с сайта</p>
                    </div>
                    
                    <div style="padding: 20px;">
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #ffae00;">
                            <h3 style="color: #ffae00; margin-top: 0;">📋 Информация о заказе</h3>
                            <p><strong>Номер заказа:</strong> #${order.id}</p>
                            <p><strong>Дата:</strong> ${new Date(order.date).toLocaleString('ru-RU')}</p>
                            <p><strong>Статус:</strong> ${getStatusText(order.status)}</p>
                            <p><strong>Способ оплаты:</strong> ${getPaymentMethodText(order.paymentMethod)}</p>
                        </div>

                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #28a745;">
                            <h3 style="color: #28a745; margin-top: 0;">👤 Данные клиента</h3>
                            <p><strong>Имя:</strong> ${order.customer.name}</p>
                            <p><strong>Телефон:</strong> <a href="tel:${order.customer.phone}">${order.customer.phone}</a></p>
                            <p><strong>Email:</strong> <a href="mailto:${order.customer.email}">${order.customer.email}</a></p>
                            <p><strong>Адрес доставки:</strong> ${order.customer.address}</p>
                            ${order.comment ? `<p><strong>Комментарий:</strong> ${order.comment}</p>` : ''}
                        </div>

                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #007bff;">
                            <h3 style="color: #007bff; margin-top: 0;">📦 Состав заказа</h3>
                            <ul>
                                ${order.items.map(item => `
                                    <li>${item.model} - ${item.quantity} шт. × ${item.price.toLocaleString()} руб. = <strong>${(item.price * item.quantity).toLocaleString()} руб.</strong></li>
                                `).join('')}
                            </ul>
                            <hr style="border: none; border-top: 2px solid #ffae00; margin: 15px 0;">
                            <h3 style="color: #ffae00; text-align: right;">💰 Итого: ${order.total.toLocaleString()} руб.</h3>
                        </div>

                        <div style="margin-top: 20px; padding: 15px; background: #e8f5e8; border-radius: 8px; text-align: center;">
                            <p><strong>✅ Заказ создан через веб-сайт RollingMoto</strong></p>
                            <p>Дата получения заказа: ${new Date().toLocaleString('ru-RU')}</p>
                        </div>
                    </div>
                </div>
            `
        };

        console.log('📤 Отправка письма...');
        const info = await transporter.sendMail(mailOptions);
        
        console.log('✅ Письмо отправлено успешно!');
        console.log('📧 ID сообщения:', info.messageId);
        
        res.json({ 
            success: true, 
            message: 'Заказ успешно отправлен! Мы свяжемся с вами в ближайшее время.',
            orderId: order.id
        });
        
    } catch (error) {
        console.error('❌ Ошибка при отправке заказа:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Произошла ошибка при отправке заказа. Пожалуйста, свяжитесь с нами по телефону.'
        });
    }
});

// Маршрут для отправки сообщений из формы обратной связи
app.post('/api/contact', async (req, res) => {
    try {
        console.log('📨 Получен запрос из контактной формы');
        const { name, phone, email, message } = req.body;
        
        console.log('📝 Данные формы:', { name, phone, email });

        // Проверяем обязательные поля
        if (!name || !phone || !email || !message) {
            console.log('❌ Неполные данные формы');
            return res.status(400).json({
                success: false,
                message: 'Все поля обязательны для заполнения'
            });
        }

        const mailOptions = {
            from: '"RollingMoto" <smol.rollingmoto@gmail.com>',
            to: 'smol.rollingmoto@gmail.com',
            replyTo: email,
            subject: `📧 Новое сообщение от ${name} - RollingMoto`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
                    <div style="background: linear-gradient(135deg, #007bff, #0056b3); padding: 20px; text-align: center; color: white;">
                        <h1 style="margin: 0;">📧 RollingMoto</h1>
                        <p style="margin: 10px 0 0; font-size: 18px;">Новое сообщение с сайта</p>
                    </div>
                    
                    <div style="padding: 20px;">
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #007bff;">
                            <h3 style="color: #007bff; margin-top: 0;">👤 Контактная информация</h3>
                            <p><strong>Имя:</strong> ${name}</p>
                            <p><strong>Телефон:</strong> <a href="tel:${phone}">${phone}</a></p>
                            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                        </div>

                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #28a745;">
                            <h3 style="color: #28a745; margin-top: 0;">💬 Сообщение</h3>
                            <p style="white-space: pre-line;">${message}</p>
                        </div>

                        <div style="margin-top: 20px; padding: 15px; background: #e8f5e8; border-radius: 8px; text-align: center;">
                            <p><strong>✅ Сообщение отправлено через веб-сайт RollingMoto</strong></p>
                            <p>Дата получения: ${new Date().toLocaleString('ru-RU')}</p>
                        </div>
                    </div>
                </div>
            `
        };

        console.log('📤 Отправка контактного письма...');
        const info = await transporter.sendMail(mailOptions);
        
        console.log('✅ Контактное письмо отправлено успешно!');
        console.log('📧 ID сообщения:', info.messageId);
        
        res.json({ 
            success: true, 
            message: 'Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.' 
        });
        
    } catch (error) {
        console.error('❌ Ошибка при отправке сообщения:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Произошла ошибка при отправке сообщения. Пожалуйста, свяжитесь с нами по телефону.'
        });
    }
});

// Маршрут для проверки работы сервера
app.get('/api/health', (req, res) => {
    res.json({ 
        success: true, 
        message: 'Сервер RollingMoto работает нормально',
        timestamp: new Date().toISOString()
    });
});

// Тестовый маршрут для отправки пробного письма
app.post('/api/test-email', async (req, res) => {
    try {
        console.log('🧪 Тестовый запрос на отправку письма');
        
        const mailOptions = {
            from: '"RollingMoto Test" <smol.rollingmoto@gmail.com>',
            to: 'smol.rollingmoto@gmail.com',
            subject: '✅ Тестовое письмо от RollingMoto',
            text: 'Это тестовое письмо. Если вы его получили, значит почтовый сервер работает корректно.',
            html: '<h1>✅ Тестовое письмо</h1><p>Это тестовое письмо от RollingMoto сервера.</p>'
        };

        const info = await transporter.sendMail(mailOptions);
        
        console.log('✅ Тестовое письмо отправлено! ID:', info.messageId);
        
        res.json({ 
            success: true, 
            message: 'Тестовое письмо отправлено успешно!',
            messageId: info.messageId
        });
        
    } catch (error) {
        console.error('❌ Ошибка при отправке тестового письма:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Ошибка при отправке тестового письма',
            error: error.message
        });
    }
});

// Обработка несуществующих маршрутов
app.use('*', (req, res) => {
    console.log(`❌ Маршрут не найден: ${req.method} ${req.originalUrl}`);
    res.status(404).json({
        success: false,
        message: 'Маршрут не найден',
        path: req.originalUrl,
        method: req.method
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на порту ${PORT}`);
    console.log(`🌐 Доступен по адресу: http://localhost:${PORT}`);
    console.log(`🔧 API эндпоинты:`);
    console.log(`   GET  /              - главная страница`);
    console.log(`   GET  /kayo.html     - страница Kayo`);
    console.log(`   POST /api/send-order - отправка заказа`);
    console.log(`   POST /api/contact    - контактная форма`);
    console.log(`   GET  /api/health     - проверка работы сервера`);
    console.log(`   POST /api/test-email - тест отправки письма`);
});