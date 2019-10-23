<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Interfaces\RouteCollectorProxyInterface as Group;

$placesHandler = function (Request $request, Response $response) {
	$response->getBody()->write("Places are here");
	return $response;
};

$placesRoutes = function (Group $group) use ($placesHandler) {
	$group->get('', $placesHandler);
};

return $placesRoutes;
