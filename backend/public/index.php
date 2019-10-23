<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/../vendor/autoload.php';
require '../src/config/database.php';


$app = AppFactory::create();

$cors = require '../src/config/cors.config.php';
$cors($app);

$routes = require '../src/app.php';
$routes($app);

$app->run();
