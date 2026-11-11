<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Método no permitido']);
    exit;
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Formato de solicitud inválido']);
    exit;
}

$nombre = isset($data['nombre']) ? trim((string)$data['nombre']) : '';
$organizacion = isset($data['organizacion']) ? trim((string)$data['organizacion']) : '';
$email = isset($data['email']) ? trim((string)$data['email']) : '';
$alcance = isset($data['alcance_tecnico']) ? trim((string)$data['alcance_tecnico']) : '';
$mensaje = isset($data['mensaje']) ? trim((string)$data['mensaje']) : '';

// Prevención de inyección de cabeceras
$cleanNombre = str_replace(["\r", "\n"], ' ', $nombre);
$cleanOrg = str_replace(["\r", "\n"], ' ', $organizacion);
$cleanEmail = filter_var(str_replace(["\r", "\n"], '', $email), FILTER_SANITIZE_EMAIL);

if (mb_strlen($cleanNombre) < 2 || mb_strlen($cleanOrg) < 2 || mb_strlen($mensaje) < 10 || !filter_var($cleanEmail, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Campos inválidos o incompletos']);
    exit;
}

$to = 'hola@macasoft.com.ar';
$subject = '=?UTF-8?B?' . base64_encode("[Consulta Técnica Macasoft] {$cleanOrg} — {$cleanNombre}") . '?=';

$body = "Nueva solicitud técnica desde la web de Macasoft\n";
$body .= "==================================================\n\n";
$body .= "Nombre: {$cleanNombre}\n";
$body .= "Organización / Empresa: {$cleanOrg}\n";
$body .= "Correo Electrónico: {$cleanEmail}\n";
$body .= "Alcance Técnico: {$alcance}\n\n";
$body .= "Desafío Técnico o Proyecto:\n";
$body .= "{$mensaje}\n\n";
$body .= "==================================================\n";
$body .= "Enviado desde el formulario de contacto de macasoft.com.ar\n";

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'From: Macasoft Web <hola@macasoft.com.ar>',
    "Reply-To: {$cleanNombre} <{$cleanEmail}>",
    'X-Mailer: Macasoft-Contact-Terminal/1.0'
];

$sent = @mail($to, $subject, $body, implode("\r\n", $headers));

if ($sent) {
    http_response_code(200);
    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'No se pudo despachar desde el servidor local']);
}

