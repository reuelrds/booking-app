<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/../vendor/autoload.php';
require '../src/config/database.php';

$app = AppFactory::create();

$routes = require '../src/routes/routes.php';
$routes($app);

$app->run();
