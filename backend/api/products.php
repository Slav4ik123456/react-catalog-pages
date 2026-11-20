<?php
header('Content-Type: application/json; charset=utf-8');

$products = [
    ['id' => 'A101', 'name' => 'Клавиатура', 'qty' => 7],
    ['id' => 'B205', 'name' => 'Мышь', 'qty' => 0],
];

echo json_encode($products, JSON_UNESCAPED_UNICODE);
