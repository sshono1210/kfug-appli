<?php
require __DIR__ . "/../../vendor/autoload.php";

use GuzzleHttp\Client; //Guzzleたたくやつ
use Illuminate\Http\JsonResponse; // JSONファイル作成？
use Carbon\Carbon;

if(isset($_GET["start"])){
    $start = $_GET["start"];
}else{
    $start = 0;
}

$url = "http://connpass.com/api/v1/event/";
$client = new Client();
$res = $client->get($url, [
    "query" => [
        "series_id" => 1100,
        "start" => $start
    ]
]);

//$date = $res["started_date"];
//$date->format("M/d");
$data = json_decode($res->getBody(), true);

$response = JsonResponse::create($data, 200, []);
$response->send();

