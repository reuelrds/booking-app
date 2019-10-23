<?php

  require 'location.model.php';
  class Place extends Location
  {
  	public $id;
  	public $title;
  	public $description;
  	public $price;
  	public $imageUrl;
  	public $availableFrom;
  	public $availableTo;
  	public $userId;
  	public $location_id;
  }
