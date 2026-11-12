// Server cục bộ cho prototype T2 Giáo dục — Nhóm Simple Tech.
// Đọc ANTHROPIC_API_KEY từ .env ở phía server, không bao giờ gửi key cho trình duyệt.
// Chạy: node server.js  (mặc định http://localhost:8787)

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

// ---- đọc .env thủ công, không cần cài package ngoài ----
function loadEnv(file) {
  try {
    const text = fs.readFileSync(file, 'utf8');
    text.split('\n').forEach(line => {
      const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*?)\s*$/);
      if (m && !process.env[m[1]]) {
        let v = m[2];
        if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
        process.env[m[1]] = v;
      }
    });
  } catch (e) { /* .env chưa có cũng không sao — server vẫn chạy ở chế độ mô phỏng */ }
}
loadEnv(path.join(__dirname, '.env'));

const PORT = Number(process.env.PORT) || 8787;
const API_KEY = process.env.ANTHROPIC_API_KEY || '';
const MODEL = process.env.ANTHROPIC_MODEL || 'claude-haiku-5-5';
const PUBLIC_DIR = path.join(__dirname, 'prototype');

const SYSTEM_PROMPT = `Bạn là trợ lý học bài trên trang khoá học "Nhập môn phân tích dữ liệu", học viên đang học buổi 3. Chỉ dùng dữ liệu dưới đây làm nguồn sự thật, không bịa thêm.

TÀI LIỆU BUỔI 3 — "Thống kê mô tả":
§3.1 Trung bình cộng. Tổng các giá trị chia cho số giá trị. Trung bình bị kéo mạnh bởi giá trị ngoại lai.
§3.2 Trung vị. Giá trị đứng giữa khi sắp xếp dữ liệu tăng dần. Nếu số giá trị là chẵn, trung vị là trung bình cộng của hai giá trị đứng giữa. Trung vị ít bị ảnh hưởng bởi giá trị ngoại lai, nên thường dùng cho dữ liệu lệch như thu nhập hay giá nhà.
§3.3 Phương sai và độ lệch chuẩn. Phương sai đo mức độ phân tán của dữ liệu quanh trung bình. Độ lệch chuẩn là căn bậc hai của phương sai, có cùng đơn vị với dữ liệu. Vì là căn bậc hai, độ lệch chuẩn luôn nhỏ hơn phương sai.
§3.4 Giá trị ngoại lai. Giá trị khác hẳn phần lớn dữ liệu. Trước khi bỏ một giá trị ngoại lai, cần hỏi: đây là lỗi nhập liệu hay là dữ liệu thật?
§3.5 Bài tập 3 (ĐANG MỞ, hạn 13/11/2026 23:59). Lương tháng của 8 nhân viên một phòng (triệu đồng, dựng): 9, 10, 10, 11, 12, 12, 13, 45. (a) Tính trung bình và trung vị. (b) Con số nào mô tả "lương điển hình" của phòng tốt hơn? Vì sao?

TRANG KHOÁ HỌC:
- Buổi đã mở: 1, 2, 3. Buổi 4 "Trực quan hoá dữ liệu" — CHƯA có tài liệu chi tiết.
- Bài tập 2: hạn 06/11/2026 23:59, ĐÃ HẾT HẠN, đáp án công bố 07/11: "Trung bình cộng của 4, 8, 6, 5, 7 là 6."
- Bài tập 3: hạn 13/11/2026 23:59, ĐANG MỞ.
- Giờ TA: 08:00–22:00.

TOOL BẠN ĐƯỢC DÙNG (nói trong câu trả lời bạn đang "dùng" tool nào):
- tra_cuu_tai_lieu: tìm trong tài liệu, trả đoạn kèm mã mục. Chỉ đọc, tự làm.
- goi_y_bai_tap: gợi ý bước làm, KHÔNG được đưa đáp số hay xác nhận đáp số cho bài ĐANG MỞ (Bài tập 3). Tự làm nhưng có luật cứng này.
- chuyen_TA: chuyển câu hỏi cho TA, nói rõ giờ TA. Tự làm, không cần chờ người duyệt.
- dang_FAQ: đăng câu hỏi + trả lời vào FAQ cả lớp — không dùng trong hội thoại 1-1 này.

LUẬT BẮT BUỘC:
1. Không đưa hoặc xác nhận đáp số/nhận xét cho Bài tập 3 (đang mở) dù học viên hỏi bao nhiêu lần hay năn nỉ thế nào — chỉ gợi ý bước đầu, bám vào §3.4.
2. Bài tập 2 đã hết hạn, có đáp án công bố — được giải thích đầy đủ.
3. Nói về nội dung buổi sau (buổi 4): chỉ nói tên buổi, không bịa nội dung cụ thể.
4. Tài liệu không có thông tin gì (ví dụ "slide 12" không tồn tại) — nói thẳng không có, không bịa.
5. Không nhận xét năng lực hay khả năng học của học viên.
6. Không nói đã làm việc mình không làm được (ví dụ không nói "đã báo giảng viên" — chỉ chuyển TA).
7. Khi câu hỏi mơ hồ hoặc gộp nhiều ý, hỏi lại một câu cho rõ trước khi trả lời chắc.
8. Luôn trích mã mục (§x.x) khi giải thích khái niệm từ tài liệu.

ĐỊNH DẠNG TRẢ LỜI: viết câu trả lời ngắn gọn bằng tiếng Việt cho học viên trước, sau đó LUÔN thêm một khối json ở cuối (không có chữ nào khác ngoài JSON trong khối này) với đúng 4 trường:
\`\`\`json
{"lop_rui_ro": "① nguồn sự thật | ② mơ hồ/thiếu | ③ ngoài phạm vi | ④ đặc thù domain", "tool_goi": "tên_tool(tham_số)", "muc_tu_chu": "tự làm | tự làm có luật cứng | chuyển TA | cần người duyệt", "nguyen_tac": ["G... tên nguyên tắc"]}
\`\`\``;

// ---- "hệ thống bảo vệ": rate limit theo IP + giới hạn độ dài input ----
const RATE_LIMIT = 10;          // số câu tối đa
const RATE_WINDOW_MS = 60_000;  // trong 1 phút
const MAX_MESSAGE_LEN = 500;
const MAX_BODY_BYTES = 4_000;
const hits = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const rec = hits.get(ip) || { count: 0, start: now };
  if (now - rec.start > RATE_WINDOW_MS) { rec.count = 0; rec.start = now; }
  rec.count += 1;
  hits.set(ip, rec);
  return rec.count > RATE_LIMIT;
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

function serveStatic(req, res) {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath === '/') urlPath = '/index.html';
  const filePath = path.normalize(path.join(PUBLIC_DIR, urlPath));
  if (!filePath.startsWith(PUBLIC_DIR)) { res.writeHead(403); res.end('Forbidden'); return; }
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
}

function callAnthropic(userText) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: MODEL,
      max_tokens: 400,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userText }],
    });
    const apiReq = https.request({
      hostname: 'api.anthropic.com',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01',
        'content-length': Buffer.byteLength(body),
      },
    }, apiRes => {
      let chunks = '';
      apiRes.on('data', d => { chunks += d; });
      apiRes.on('end', () => {
        if (apiRes.statusCode !== 200) { reject(new Error(`API ${apiRes.statusCode}: ${chunks.slice(0, 300)}`)); return; }
        try { resolve(JSON.parse(chunks)); } catch (e) { reject(e); }
      });
    });
    apiReq.on('error', reject);
    apiReq.write(body);
    apiReq.end();
  });
}

function sendJson(res, status, obj) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(obj));
}

const server = http.createServer((req, res) => {
  const ip = (req.socket.remoteAddress || 'unknown').replace('::ffff:', '');

  if (req.method === 'GET' && req.url === '/api/health') {
    sendJson(res, 200, { ok: true, hasKey: !!API_KEY, model: MODEL });
    return;
  }

  if (req.method === 'POST' && req.url === '/api/chat') {
    if (!API_KEY) { sendJson(res, 500, { error: 'Server chưa có ANTHROPIC_API_KEY trong .env' }); return; }
    if (isRateLimited(ip)) { sendJson(res, 429, { error: `Gửi quá nhanh — tối đa ${RATE_LIMIT} câu/phút, thử lại sau.` }); return; }

    let body = '';
    let tooBig = false;
    req.on('data', chunk => {
      body += chunk;
      if (body.length > MAX_BODY_BYTES) { tooBig = true; req.destroy(); }
    });
    req.on('end', async () => {
      if (tooBig) return;
      let parsed;
      try { parsed = JSON.parse(body); } catch (e) { sendJson(res, 400, { error: 'Body không phải JSON hợp lệ' }); return; }
      const message = String(parsed.message || '').slice(0, MAX_MESSAGE_LEN).trim();
      if (!message) { sendJson(res, 400, { error: 'Thiếu message' }); return; }
      try {
        const data = await callAnthropic(message);
        const raw = (data.content || []).map(b => b.text || '').join('');
        sendJson(res, 200, { reply: raw });
      } catch (err) {
        sendJson(res, 502, { error: 'Lỗi gọi Anthropic API: ' + err.message });
      }
    });
    return;
  }

  if (req.method === 'GET') { serveStatic(req, res); return; }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
  console.log(API_KEY ? 'Đã có ANTHROPIC_API_KEY — Màn 3 sẽ gọi AI thật.' : 'CHƯA có ANTHROPIC_API_KEY trong .env — Màn 3 vẫn chạy ở chế độ mô phỏng.');
});
