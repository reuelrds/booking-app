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

    foreach($fetched_places as $place) {
      
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

    // echo print_r($fetched_places);
    // echo print_r($places);
    echo json_encode($places);

  } catch (PDOException $e) {
    echo '{"error": {"message": "'.$e->getMessage().'"}}';
  }

	return $response;
};

$postPlaces = function (Request $request, Response $response) {
	$response->getBody()->write("Places Post");
	return $response;
};

return [
  'getPlaces' => $getPlaces,
  'postPlaces' => $postPlaces
];