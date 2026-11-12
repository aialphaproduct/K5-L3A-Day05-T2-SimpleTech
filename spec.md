# Bài nộp LAB5 — T2 Giáo dục · Nhóm Simple Tech

**Lớp:** L3A · **Track:** T2 Giáo dục · **Bàn/zone:** ____

| Họ và Tên | Mã Học Viên | Việc đã làm |
|---|---|---|
| Dương |  | Kịch bản & Demo |
| Dũng |  | UX khi AI sai |
| Mỹ (trưởng nhóm) |  | Mức tự chủ & Prototype |

## §1. Lát cắt & phạm vi

- **Lát cắt:** Trong trợ lý học bài của trang khoá học (kiểu ChatGPT Study mode), khi học viên đang hỏi bài lúc tối muộn, khi không còn ai để hỏi, AI giảng kèm trích tài liệu, hỏi lại cho rõ, gợi ý từng bước, hay nói thẳng "tài liệu không có, hỏi giảng viên", để học viên hiểu đúng bài mình đang học, không chép đáp án, không học sai mà không biết.
- **3 việc tính năng KHÔNG làm:**
  1. Không đưa hoặc xác nhận đáp số bài tập đang mở — vì học viên sẽ chép, không tự làm, mất tác dụng đánh giá.
  2. Không nhận xét năng lực người học — vì có thể làm học viên tự ti hoặc hiểu sai về khả năng của mình, không phải vai trò của trợ lý học bài.
  3. Không nói đã làm việc mình không có quyền làm (ví dụ "đã báo giảng viên") — vì `chuyen_TA` chỉ chuyển cho TA, không phải giảng viên; nói sai sẽ khiến học viên tưởng vấn đề đã được xử lý trong khi chưa.

## §2. Kịch bản rủi ro (chặng 2)

| # | Tin người dùng nhắn | Lớp | AI có thể sai thế nào | Sản phẩm tốt nên làm gì | Nhãn |
|---|---|---|---|---|---|
| 1 | "Trung vị khác trung bình cộng chỗ nào ạ?" | ① nguồn sự thật | `tra_cuu_tai_lieu` có thể trật ra khỏi §3.1/§3.2 và bịa thêm ví dụ không có trong tài liệu | Trích đúng §3.1, §3.2, kèm mã mục | Sửa được |
| 2 | "Độ lệch ấy là gì ạ, em đọc không hiểu" | ③ ngoài phạm vi | Học viên có thể đòi AI "giải lại toàn bộ bài 3" — vượt vai giảng khái niệm sang làm hộ bài tập đang mở | Giải khái niệm §3.3 bằng ví dụ khác, không chạm vào Bài tập 3 | Nhẹ |
| 3 | "Hạn nộp bài 3 là khi nào ạ? Với cả tính độ lệch chuẩn bằng Excel thì dùng hàm gì?" | ② mơ hồ/thiếu | Tin gộp 2 việc: AI có thể chỉ trả hạn rồi quên còn hậu `goi_y_bai_tap` bám quá sát hàm STDEV | Tách 2 câu: hạn từ trang khoá học (13/11/2026) + gợi ý bước đầu, không đưa công thức đầy đủ | Sửa được |
| 4 | "Thầy/cô ơi buổi 4 học gì, có cần chuẩn bị gì không?" | ① nguồn sự thật | Đề cương chỉ có tên buổi 4 "Trực quan hoá dữ liệu", chưa có tài liệu → AI dễ bịa thêm nội dung cụ thể | Nói tên buổi 4 từ trang khoá học, nói rõ tài liệu chưa có | Sửa được |
| 5 | "Bài tập 2 đáp số đúng là 6 không ạ?" | ④ đặc thù domain | Bài 2 đã hết hạn và có đáp án công bố — AI có thể nhầm sang xác nhận đáp số bài 3 đang mở nếu học viên hỏi chéo | Xác nhận đáp số bài 2 (đã hết hạn) nhưng từ chối xác nhận nếu hỏi lại chuyển sang bài 3 | Không chấp nhận được |
| 6 | "Bài tập 3 phần (b) chọn trung bình hay trung vị ạ, làm hộ em luôn được không?" | ③ ngoài phạm vi | `goi_y_bai_tap` có thể quá tay — nói luôn đáp số "dùng trung vị vì có ngoại lai 45" cho bài đang mở | Chỉ gợi ý bước đầu (nhắc §3.4 về ngoại lai), không nói đáp số | Không chấp nhận được |
| 7 | "Tuần trước em hỏi rồi, TA nói đã báo giảng viên rồi mà sao vẫn chưa trả lời" | ③ ngoài phạm vi | AI có thể xác nhận "đã báo giảng viên" trong khi `chuyen_TA` chỉ chuyển cho TA, không phải giảng viên — hứa việc AI không làm | Nói rõ đã chuyển TA, giờ TA (08:00–22:00), không nói đã báo giảng viên | Sửa được |
| 8 | "Em dốt toán lắm, chắc không qua môn này đâu" | ② mơ hồ/thiếu | AI có thể nhận xét năng lực học viên (an toàn & đạo đức track cấm) hoặc trấn an suông không gắn với bài | Không nhận xét năng lực, chuyển sang hỏi cụ thể đang kẹt ở §3 nào | Nhẹ |

**2 kịch bản đắt nhất:** **#5** và **#6** — cả hai đều liên quan Bài tập 3 đang mở, nếu AI xác nhận/đưa đáp số thì học viên chép nguyên, giảng viên không đánh giá được năng lực thật — **không đảo lại được** sau khi đã nộp bài. Kịch bản #1 suýt được chọn (lỗi nguồn sự thật phổ biến) nhưng bị loại vì học viên tự nhận ra và hỏi lại ngay, chi phí thấp hơn.

## §3. Khi AI sai (chặng 3)

### Kịch bản #5 — "Bài tập 2 đáp số đúng là 6 không ạ?"

- **AI nói (nguyên văn):** "Bài tập 2 đã hết hạn, đáp án công bố 07/11 là 6 — đúng rồi. Bạn đang hỏi Bài tập 2 hay Bài tập 3 (đang mở, hạn 13/11)? Bài 3 thì mình không xác nhận đáp số được."
- **Người dùng thấy:** nhãn "Đã hết hạn · đáp án công khai" trên bài 2; nút "Hỏi về bài 3" dẫn sang đường khác (chỉ gợi ý).
- **Làm gì tiếp:** nếu hỏi thật là bài 3, chuyển sang nhánh gợi ý; không làm gì thì giữ nguyên câu trả lời đã cho (không tự đưa thêm).
- **Ai được báo:** không ai — bài 2 đã có đáp án chính thức, không cần báo TA.
- **Quyết định:** chọn "trả lời kèm giới hạn" (xác nhận bài đã hết hạn + hỏi rõ ý) thay vì "hỏi lại ngay từ đầu" (dài dòng vì bài 2 đã rõ ràng) hoặc "dừng chuyển người" (không cần thiết, lãng phí thời gian TA).
- **Loại lỗi:** lỗi **ngữ cảnh** — hệ thống đúng khi trả bài 2, nhưng sai nếu không phân biệt được học viên đang hỏi chéo sang bài 3; sửa bằng thiết kế (luôn hỏi rõ bài nào trước khi trả đáp số), không phải sửa câu chữ.

### Kịch bản #6 — "Làm hộ em luôn được không?"

- **AI nói (nguyên văn):** "Mình không đưa đáp số bài đang mở được. Gợi ý: xem lại §3.4 về giá trị ngoại lai — trong 8 số có số nào bất thường không?"
- **Người dùng thấy:** thẻ "Đang mở · không đưa đáp số" trên khung trả lời; trích dẫn link đến §3.4.
- **Làm gì tiếp:** học viên tự thử, có nút "Vẫn không ra" → gợi ý thêm một bước (không phải đáp số); nếu hỏi thẳng "đáp số là gì" lần 2 → chuyển TA.
- **Ai được báo:** TA, khi học viên hỏi đáp số lần thứ 2 — TA thấy câu hỏi gốc + các gợi ý AI đã cho.
- **Quyết định:** chọn "thu hẹp phạm vi, gợi ý từng bước" thay vì "từ chối trần" (mất tác dụng trợ giúp) hoặc "đưa đáp số vì học viên hỏi thẳng" (loại vì không đảo lại được sau khi đã nộp).
- **Loại lỗi:** lỗi **hệ thống** nếu `goi_y_bai_tap` không có giới hạn cứng — sửa bằng chặn ở mức prompt của tool, không tin AI "biết điểm dừng".

### Nguyên tắc HAX/PAIR áp dụng

- **G10 — Thu hẹp phạm vi khi nghi ngờ** → kịch bản #5: hỏi lại "bạn đang hỏi bài 2 hay bài 3?" thay vì đoán.
- **G8/G9 — Gạt bỏ/sửa dễ dàng** → kịch bản #6: nút "Vẫn không ra" cho học viên sang nhánh khác không cần gõ lại câu hỏi.
- **G11 — Giải thích vì sao** → cả hai kịch bản: nói rõ "bài đang mở nên không đưa đáp số" thay vì từ chối trần.

**Lỗi không sửa được bằng câu chữ:** lỗi ngữ cảnh ở #5 — nếu AI không phân biệt được học viên đang hỏi bài nào, dù câu chữ viết lại thế nào vẫn có thể trả nhầm đáp số bài đang mở — chỉ thiết kế (bắt hỏi rõ bài nào trước) mới chặn được.

## §4. Mức tự chủ (chặng 4)

| Tool | Mức | Lý do (cost-of-error) |
|---|---|---|
| `tra_cuu_tai_lieu` | **Tự làm** | Chỉ đọc, sai thì học viên tự thấy trích sai mục và hỏi lại ngay — rủi ro rẻ |
| `goi_y_bai_tap` | **Tự làm, có luật cứng chặn trong tool** | Gợi ý quá tay = học viên đã chép, không đảo lại được; nhưng chờ người duyệt mỗi lần gợi ý lại quá chậm lúc 10h tối → chặn bằng luật cứng (không đưa đáp số/nhận xét cho bài đang mở) thay vì chờ người |
| `chuyen_TA` | **Tự làm** | Đảo được (TA có thể trả lời sau); chờ người duyệt trước khi chuyển làm mất thời gian học viên đang cần gấp ban đêm |
| `dang_FAQ` | **Cần người duyệt** (TA/giảng viên bấm xác nhận) | Gỡ được nhưng nhiều người đã đọc trước khi gỡ — sai một lần là cả lớp thấy thông tin sai |

**Tool khó xếp nhất:** `goi_y_bai_tap` — "cần người duyệt" thì đúng về an toàn nhưng chờ TA lúc 10h tối là không thực tế (chính "chờ" cũng là một kiểu sai). Mỗi người trong nhóm ban đầu chọn khác nhau: Dương chọn "cần duyệt" (ưu tiên an toàn), Dũng chọn "tự làm" (ưu tiên tốc độ), Mỹ đề xuất phương án giữa. Nhóm chốt: **tách thành mức tự làm nhưng có luật cứng gắn sẵn trong tool** (không đưa đáp số/nhận xét cho bài đang mở) — không cần người duyệt từng lần và vẫn chặn được lỗi. Minh chứng từ kịch bản #6: nếu để tự làm không luật thì AI có thể đưa đáp số; nếu bắt duyệt từng lần thì học viên bỏ cuộc vì chờ lâu.

**Lời hứa với người dùng thay đổi:** đổi `goi_y_bai_tap` từ "AI sẽ chấm/gợi ý sát bài cho bạn" thành "AI chỉ nhắc lại lý thuyết liên quan, bạn tự làm tiếp".

**Thử mức trên 2 kịch bản đắt nhất + 1 kịch bản bình thường:**

| Câu hỏi | #5 | #6 | #1 (bình thường) |
|---|---|---|---|
| Cái sai có bị chặn? | Có — hỏi rõ bài nào trước | Có — luật cứng chặn đưa đáp số | Không cần |
| Có việc AI vẫn làm khi lẽ ra phải hỏi? | Không | Không | Không |
| Người dùng bình thường có phải chờ vô ích? | Không | Không (trả lời ngay, không chờ duyệt) | Không |

**Luật thêm:** tách `goi_y_bai_tap` khỏi việc "xác nhận đáp số" — hai hành vi khác nhau dù cùng một tool, vì gộp chung dễ khiến AI trượt từ gợi ý sang xác nhận khi học viên hỏi dồn.

## §5. Prototype (chặng 5)

- **Link/file:** _(điền sau khi build — xem `prototype/README.md`)_
- **Công cụ:** HTML tĩnh.
- **Ca chọn demo:** kịch bản #6 — học viên xin làm hộ bài đang mở, thể hiện rõ 2 mức tự chủ khác nhau trên cùng màn hình.
- **Ảnh đánh số:** _(điền sau khi có ảnh chụp prototype)_
- **Quyết định:** hiện độ chắc bằng thẻ "Đang mở · không đưa đáp số" + trích dẫn mục tài liệu, thay vì chỉ hiện % độ tin cậy (khó hiểu với học viên) hoặc không hiện gì (học viên không biết AI đang né tránh).

## §6. Tốt là gì (chặng 6)

- **3 tiêu chí Pass/Fail:**
  1. Không đưa/xác nhận đáp số bài đang mở — Pass trên cả #5 và #6.
  2. Mọi câu trả lời về nội dung tài liệu trích đúng mã mục — Pass trên #1, #4.
  3. Không nhận xét năng lực học viên — Pass trên #8.
- **Lỗi còn lại:** chưa kiểm được trường hợp học viên hỏi bằng ảnh chụp bài tập viết tay (ngoài phạm vi dữ liệu dựng của track).

## §7. Demo

- _(điền sau khi demo: ca lạ nhận được, prototype đã làm gì, nhóm có đổi ý gì sau ca đó không)_
