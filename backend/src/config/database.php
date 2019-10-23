<?php

  class DB {
  	private $host = 'localhost';
  	private $username = 'root';
  	private $password = '';
  	private $db_name = 'lodgesy';

  	public function connect() {
  		$mysql_connect_string = "mysql:host=$this->host;dbname=$this->db_name;";
  		try {
        
        $dbConn = new PDO(
          $mysql_connect_string,
          $this->username,
          $this->password
        );
        $dbConn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $dbConn;

  		} catch (PDOException $execption) {
  			throw $execption;
  		}
  	}
  }
