<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Interfaces\RouteCollectorProxyInterface as Group;

require __DIR__ . '/../../models/place.model.php';

$getPlaces = function (Request $request, Response $response) {
	$sql = "SELECT * from places p, location l WHERE p.location_id = l.location_id";

	try {
		$db = new DB();
		$db = $db->connect();

		$stmt = $db->query($sql);
		$fetched_places = $stmt->fetchAll(PDO::FETCH_CLASS, "Place");
	
		$places = array();

		foreach ($fetched_places as $place) {
			unset($place->location_id);

			$location = array();
			$location['lat'] = $place->lat;
			$location['lng'] = $place->lng;
			$location['address'] = $place->address;
			$location['staticMapImageUrl'] = $place->staticMapImageUrl;

			unset($place->lat);
			unset($place->lng);
			unset($place->address);
			unset($place->staticMapImageUrl);

			$places[$place->id] = array_slice((array)$place, 1);
			$places[$place->id]["location"] = $location;
		}

		$response->getBody()->write(json_encode($places, JSON_NUMERIC_CHECK));
		return $response;
	} catch (PDOException $e) {
		echo '{"error": {"message": "'.$e->getMessage().'"}}';
	}

	return $response;
};

$getPlace = function (Request $request, Response $response, $args) {
	$sql = "SELECT * from places p, location l WHERE p.location_id = l.location_id AND p.id = :placeId";

	try {
		$db = new DB();
		$db = $db->connect();

		$stmt = $db->prepare($sql);
		$stmt->bindParam(':placeId', $args['placeId']);
		$stmt->execute();
		$stmt->setFetchMode(PDO::FETCH_CLASS, "Place");
		$place = $stmt->fetch();
	

	  
		unset($place->location_id);

		$location = array();
		$location['lat'] = $place->lat;
		$location['lng'] = $place->lng;
		$location['address'] = $place->address;
		$location['staticMapImageUrl'] = $place->staticMapImageUrl;

		unset($place->lat);
		unset($place->lng);
		unset($place->address);
		unset($place->staticMapImageUrl);

		$place = array_slice((array)$place, 1);
		$place["location"] = $location;

		$response->getBody()->write(json_encode($place));
		return $response;
	} catch (PDOException $e) {
		echo '{"error": {"message": "'.$e->getMessage().'"}}';
	}

	return $response;
};

return [
  'getPlaces' => $getPlaces,
  'getPlace' => $getPlace
];
