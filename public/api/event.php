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

setlocale(LC_ALL, 'ja_JP.UTF-8');
//echo Carbon::now()->formatLocalized('%Y年%m月%d日(%a)');

foreach ($data["events"] as $key=>$event) {
    $data["events"][$key]["date"] = Carbon::createFromFormat(DateTime::ATOM,$event["started_at"])->formatLocalized('%m/%d');
    $data["events"][$key]["dayOfTheWeek"] = Carbon::createFromFormat(DateTime::ATOM,$event["started_at"])->formatLocalized('(%a)');
    $data["events"][$key]["time"] = Carbon::createFromFormat(DateTime::ATOM,$event["started_at"])->format('H : i');
}

$response = JsonResponse::create($data, 200, []);
$response->send();

