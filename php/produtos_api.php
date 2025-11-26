    <?php
    header('Content-Type: application/json; charset=utf-8');
    require_once __DIR__ . '/config.php';

    $method = $_SERVER['REQUEST_METHOD'];
    $action = $_GET['action'] ?? $_POST['action'] ?? null;

    try {
    if ($method === 'GET') {
        if (isset($_GET['id'])) {
        $st = $pdo->prepare("SELECT * FROM produtos WHERE id = ?");
        $st->execute([intval($_GET['id'])]);
        $row = $st->fetch();
        echo json_encode($row ?: []);
        } else {
        $st = $pdo->query("SELECT * FROM produtos ORDER BY id DESC");
        $rows = $st->fetchAll();
        echo json_encode($rows);
        }
        exit;
    }

    if ($method === 'POST' && ($action ?? 'create') === 'create') {
        $nome = trim($_POST['nome'] ?? '');
        $categoria = trim($_POST['categoria'] ?? '');
        $preco = $_POST['preco'] ?? '';
        $disponibilidade = $_POST['disponibilidade'] ?? 'Em Estoque';
        $imagem = trim($_POST['imagem'] ?? '');

        if ($nome === '' || $categoria === '' || $preco === '') {
        http_response_code(400);
        echo json_encode(['error' => 'Campos obrigatórios não preenchidos.']);
        exit;
        }

        $st = $pdo->prepare("INSERT INTO produtos (nome, categoria, preco, disponibilidade, imagem) VALUES (?,?,?,?,?)");
        $st->execute([$nome, $categoria, $preco, $disponibilidade, $imagem ?: null]);

        echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
        exit;
    }

    if ($method === 'POST' && $action === 'update') {
        $id = intval($_POST['id'] ?? 0);
        $nome = trim($_POST['nome'] ?? '');
        $categoria = trim($_POST['categoria'] ?? '');
        $preco = $_POST['preco'] ?? '';
        $disponibilidade = $_POST['disponibilidade'] ?? 'Em Estoque';
        $imagem = trim($_POST['imagem'] ?? '');

        if ($id <= 0) { http_response_code(400); echo json_encode(['error' => 'ID inválido']); exit; }
        if ($nome === '' || $categoria === '' || $preco === '') {
        http_response_code(400);
        echo json_encode(['error' => 'Campos obrigatórios não preenchidos.']);
        exit;
        }

        $st = $pdo->prepare("UPDATE produtos SET nome=?, categoria=?, preco=?, disponibilidade=?, imagem=? WHERE id=?");
        $st->execute([$nome, $categoria, $preco, $disponibilidade, $imagem ?: null, $id]);

        echo json_encode(['success' => true]);
        exit;
    }

    if ($method === 'POST' && $action === 'delete') {
        $id = intval($_POST['id'] ?? 0);
        if ($id <= 0) { http_response_code(400); echo json_encode(['error' => 'ID inválido']); exit; }

        $st = $pdo->prepare("DELETE FROM produtos WHERE id=?");
        $st->execute([$id]);

        echo json_encode(['success' => true]);
        exit;
    }

    http_response_code(405);
    echo json_encode(['error' => 'Método não suportado']);
    } catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro no servidor']);
    }
