<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Interfaces\RouteCollectorProxyInterface as Group;

$bookingsHandler = function (Request $request, Response $response) {
	$response->getBody()->write("Bookings routes");
	return $response;
};

$bookingRoutes = function (Group $group) use ($bookingsHandler) {
	$group->get('', $bookingsHandler);
};


return $bookingRoutes;