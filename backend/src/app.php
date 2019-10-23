<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;

$bookingRoutes = require __DIR__ . '/routes/bookings.php';
$placesRoutes = require __DIR__ . '/routes/places.php';


return function (App $app) use ($bookingRoutes, $placesRoutes) {
	$app->group('/api/bookings', $bookingRoutes);
	$app->group('/api/places', $placesRoutes);
};
