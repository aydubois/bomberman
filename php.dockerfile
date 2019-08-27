FROM php:7-fpm

RUN apt-get update && apt-get install -y libmcrypt-dev \
    mysql-client libmagickwand-dev git libzip-dev unzip zip --no-install-recommends \
    && pecl install imagick \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && docker-php-ext-enable imagick \
    && docker-php-ext-install pdo_mysql zip \
    && pecl clear-cache