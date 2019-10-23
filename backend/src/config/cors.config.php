<?php

use Slim\App;

$cors = function ($request, $handler) {
	$response = $handler->handle($request);
	return $response
			->withHeader('Access-Control-Allow-Origin', '*')
			->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
			->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
};


return function (App $app) use ($cors) {
	$app->add($cors);
};
