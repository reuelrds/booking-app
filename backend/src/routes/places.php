<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Interfaces\RouteCollectorProxyInterface as Group;

$placesHandler = require __DIR__ . '/../controllers/places/places.controller.php';

$placesRoutes = function (Group $group) use ($placesHandler) {
  $group->get('', $placesHandler["getPlaces"]);
  $group->get('/{placeId}', $placesHandler["getPlace"]);
};

return $placesRoutes;
