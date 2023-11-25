<?php

if ($_SERVER["REQUEST_METHOD"] != "POST") { 
    http_response_code(405);
    echo json_encode([ "message"=> "This endpoint accepts only POST."]);
}
