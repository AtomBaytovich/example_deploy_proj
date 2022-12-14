# 👨‍💻 Как правильно деплоить сайт? Node.js (Nginx и SSL Let's Encrypt), PM2 + GIT bonuse

В этом гайде я расскажу как правильно задеплоить сайт на хостинг с доменом, настроим SSL сертификат для HTTPS протокола (certbot). Познакомимся с NGNIX и PM2.

Для примера проекта, который будет здесь, я создал простейший сайт на express (свою визитку).
Т.к. я не ux/ui designer, то дизайн не супер-пупер (простите).

[Online demo: норм.com](https://норм.com)

[Мой авторский TG канал](https://t.me/atom_baytovich)

## Начало
(чуть сухой терминологии)
- pm2 - это менеджер процессов, который поможет вам управлять вашим приложением и поддерживать его онлайн 24/7.
- ngnix - это веб-сервер и почтовый прокси-сервер, работающий на Unix-подобных операционных системах. Имеет неблокирующий ввод/вывод. (поэтому такой быстрый) (кстати, его создатель - это разработчик из России)
- https - это расширение протокола HTTP. Оно позволяет существенно снизить риск перехвата персональных данных посетителей (логины, пароли, номера банковских карт и т. д.), а также избежать подмены контента, в том числе рекламы, при загрузке сайта.
- ssl (Secure Sockets Laye) - это цифровой сертификат, удостоверяющий подлинность веб-сайта и позволяющий использовать зашифрованное соединение.

📌 Для того, чтобы залить сайт, нам нужны ДОМЕН и VPS-сервер (в нашем случае UBUNTU 20.04).
Я буду использовать [reg.ru (!не реклама!)](https://www.reg.ru/?rlink=reflink-10083843)

📌 Программы, которые я буду использовать: [TERMIUS - ssh](https://termius.com/) и [FileZilla - ftp](https://www.filezilla.ru/)

[Как купить / настроить домен](https://help.reg.ru/hc/ru/articles/4408047000977-%D0%9A%D0%B0%D0%BA-%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%B0%D1%82%D1%8C-%D0%B4%D0%BE%D0%BC%D0%B5%D0%BD-%D0%BA-VPS) на vps рассказано у [reg.ru](https://www.reg.ru/?rlink=reflink-10083843) в статьях.
Примечание* создание записи в dns сервера к домену произойдёт не сразу.

## Продолжаем

🥷 После покупки сервера с доменом и настройки домена на dns, мы можем приступить к "внутрянке".

1. Зайдём на наш vps-сервер по ssh и обнаружим, что он вовсе пустой.
2. Установим Node.js первым делом

```ssh
sudo apt update # обновление состояние пакетов
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install nodejs
```
3. После установки проверим версии Node.js и npm (должны видны версии в случае успеха)
```ssh
node --version
npm --version
```
4. Установим ngnix 
```ssh
sudo apt install nginx # Отвечаем 'y'

```
5. Установим SSL сертфиката Let's Encrypt
```ssh 
sudo apt install certbot python3-certbot-nginx # Отвечаем 'y'
```
6. Настроим Certbot и автообновление сертификата
```ssh
sudo certbot --nginx -d домен.com -d www.домен.com
certbot renew --dry-run  # это автообновление
```
7. Далее зайдём в настройку виртуальных хостов

```ssh
sudo nano /etc/nginx/sites-available/default 
```
8. Поля конфигурации полностью изменить на: [полная конфигурация редиректов с www и https в тг](https://t.me/atom_baytovich/17)
9. Ctrl + X чтобы выйти, Ctrl + X чтобы сохранить и после нажать клавишу Enter. И перезагрузить Ngnix
```ssh
sudo service nginx restart
```

10. ✨ БОНУС установка GIT
```ssh
sudo apt update
sudo apt install git
```
* Настройка git
```
git config --global user.name "Your Name"
git config --global user.email "youremail@domain.com"
```
* После клонируем проект с GitHub и стандартные команды
```ssh
git clone 'url'
```

#### _Вуаля, готово. После обращаемся к самому проекту_

## Перейдём к PM2
Его установка глобально:

```ssh
npm install pm2 -g
```

Запуск проекта:
```ssh
pm2 start index.js
```

Остановка проекта:
```ssh
pm2 stop index.js
```

Посмотреть логи:
```ssh
pm2 logs
```

Посмотреть статус всех приложений pm2:
```ssh
pm2 status
```


## ⭐️ Ну вот и всё. Спасибо за внимание!
Подписывайся на [мой тг](https://t.me/atom_baytovich) и поставь звёздочку репозиторию. Я старался 😘
