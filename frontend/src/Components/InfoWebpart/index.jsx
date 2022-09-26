import classNames from "classnames/bind";
import styles from "./infowebpart.module.scss";
const cx = classNames.bind(styles);

function InfoWebpart() {
  return (
    <div>
      <div className={cx("form")}>
        <div className={cx("line")}>
          <h2 className="text-xl font-semibold">Info Web</h2>
        </div>
        <div className="p-5">
          <p>
            1. Mọi Sinh viên/Học viên khi tham gia sử dụng hệ thống portal
            MyDuyTan phải chịu trách nhiệm hoàn toàn về sự xác thực và tính
            chính xác của mọi thông tin mình cập nhật, đăng ký, đăng tải,…;
          </p>
          <p>
            2. Nghiêm cấm mọi hành vi phá hoại hệ thống MyDuyTan dưới mọi hình
            thức, khiến hệ thống không tiếp tục hoạt động, bằng các tiểu xảo kỹ
            thuật hay bằng những thông tin sai lệch;
          </p>
          <p>
            3. Mỗi Sinh viên/Học viên có trách nhiệm quản lý thông tin tài
            khoản, mật khẩu đăng nhập và Mã số Sinh viên/Học viên của mình.
            Không được tiết lộ thông tin tài khoản cá nhân của mình cho bất kỳ
            một cá nhân hay tổ chức nào khác;
          </p>
          <p>
            4. Sinh viên/Học viên chịu hoàn toàn trách nhiệm về các hành vi thực
            hiện thông qua tài khoản của mình nếu để lộ thông tin (đăng nhập)
            tài khoản cá nhân.
          </p>
          <p>
            5. Nghiêm cấm hành vi dùng Email trường cấp (…@dtu.edu.vn) cho các
            mục đích spam hay phát tán thông tin sai lệch, đồi trụy hoặc phản
            động;
          </p>
          <p>
            6. Không được sử dụng các hình ảnh dễ gây hiểu nhầm, kinh dị, đồi
            trụy, phản động hay trái với thuần phong mỹ tục của người Việt Nam
            cho Avatar (hình ảnh biểu trưng) của tài khoản cá nhân).
          </p>
          <p>
            7. Kích thước Avatar không được quá 130 x 130 pixel (hay 3,67cm x
            3,67cm) và dung lượng không được lớn hơn 150 KB;
          </p>
          <p>
            8. Sinh viên/Học viên ở học kỳ đầu (hay trong một số trường hợp, ở
            năm đầu) phải tuân thủ việc phân bổ môn học của nhà trường.
          </p>
          <p>
            9. Sinh viên/Học viên cam kết chịu trách nhiệm hoàn toàn về những
            quyết định Đăng ký Môn học của mình theo từng học kỳ (sau học kỳ đầu
            tiên) trên myDuyTan. Những quyết định đăng ký môn, bỏ môn, thôi môn
            sẽ ảnh hưởng đến tiến độ học nhanh hay chậm của sinh viên cũng như
            gián tiếp tác động đến kết quả học tập cuối cùng cho kỳ học đó.
          </p>
          <p>
            10. Sinh viên/Học viên có quyền và chịu trách nhiệm với các quyết
            định xin thay đổi Cố vấn Học tập của mình. Việc cuối cùng có thay
            đổi được Cố vấn Học tập hay không lại tùy thuộc vào xét duyệt của
            nhà trường.
          </p>
          <p>
            11. Trong quá trình học tập, Sinh viên/Học viên sẽ sử dụng myDuyTan
            (mà chủ yếu là hệ thống eLearning SAKAI) để đăng tải thông tin, ý
            kiến, ý tưởng của bản thân cũng như để nộp bài, làm bài, thi cử,...
            Sinh viên được yêu cầu sử dụng các quy cách sau cho những thông tin
            đăng tải trực tiếp hay qua các tập tin được tải lên:
          </p>
          <p>
            <strong>. Qui định về Chữ viết:</strong>
          </p>
          <p>
            Cỡ chữ: rõ ràng, dễ nhìn, dễ đọc, nên có kích thước từ 12 pt trở
            lên,
          </p>
          <p>Định dạng: Unicode,</p>
          <p>
            Font chữ: tránh dùng các font chữ uốn éo, to bản, lệch pha,... trong
            các văn bản có tính quy phạm,
          </p>
          <p>
            Màu chữ: không dùng màu trắng (trừ khi trên nền đen hay nền màu sậm)
            và hạn chế dùng (toàn bộ) màu đỏ (trừ khi để chỉ những thông tin
            quan trọng hay cấp thiết).
          </p>
          <p>
            <strong>Qui định về Nội dung:</strong>
          </p>
          <p>
            Không đăng tải hay phát tán các thông tin độc hại, đồi trùy, phản
            động, hay có nội dung không phù hợp với thuần phong mỹ tục của Việt
            Nam,
          </p>
          <p>
            Không tuyên truyền hay quảng cáo cho bất kỳ một cá nhân hay tổ chức
            nào
          </p>
          <p>
            Không dẫn hay đưa link đến các tài liệu có nội dung độc hại, đồi
            trùy, phản động, hay không phù hợp với thuần phong mỹ tục của Việt
            Nam trên Internet,
          </p>
          <p>
            Không đăng tải hay dẫn link đến những mã độc, malware, Internet
            worm, virus,... có thể dẫn đến việc phá hoại hay gián đoạn hoạt động
            của myDuyTan.
          </p>
          <p>
            12. Kích thước của các tập tin tải lên các hệ thống của myDuyTan nên
            từ 10 MB trở xuống.
          </p>
          <p>
            13. Sinh viên có trách nhiệm thường xuyên theo dõi Lịch học (hay
            thời khóa biểu) của bản thân để đến lớp và ra về đúng giờ và không
            đến lớp khi Lịch học đã bị thay đổi.
          </p>
          <p>
            14. Sinh viên có trách nhiệm thường xuyên theo dõi Bảng điểm (Tổng
            kết các Học phần) và Bảng điểm Cụ thể (từng Học phần) của bản thân
            để quản lý tiến độ và nỗ lực học tập của mình.
          </p>
          <p>
            15. Sinh viên có trách nhiệm thường xuyên theo dõi Tin tức (& Sự
            kiện) và Thông báo trên myDuyTan để nắm tình hình hoạt động và các
            sự kiện đang diễn ra ở khoa chủ quản cũng như tại các đơn vị khác
            trong toàn trường.
          </p>
          <p>
            16. Khi phát hiện bất kỳ sai lệch hay thiếu sót nào về thông tin cá
            nhân, môn học đăng ký, cố vấn học tập, thời lịch, điểm số, quên mật
            khẩu,... trong tài khoản myDuyTan của mình thì sinh viên có thể đến:
          </p>
          <p className="text-center">
            <strong>
              Phòng Đào Tạo Trường Đại Học Duy Tân (Phòng 206 - 209 Phan Thanh
              Đà Nẵng)
            </strong>
          </p>
          <p className="text-center">
            <strong>
              Tel.: 0935.52.53.54 - (Thầy Nguyễn Đăng Quang Huy) - Email:
              hotrodaotao@duytan.edu.vn
            </strong>
          </p>
          <p>
            để được trợ giúp. Khi đi, phải cầm theo thẻ sinh viên (hay thẻ học
            viên) để tiến hành đối chiếu. Chúng tôi sẽ không hỗ trợ cho bất kỳ
            cá nhân nào nếu không xuất trình được thẻ sinh viên (hay thẻ học
            viên) và các giấy tờ có liên quan.
          </p>
          <p>
            <strong>XỬ PHẠT VI PHẠM:</strong>
          </p>
          <p>
            1. Khi phát hiện ra bất kỳ biểu hiện nào vi phạm một trong những quy
            định kể trên, Quản lý hệ thống myDuyTan và/hoặc các Cán bộ có chức
            năng sẽ có thẩm quyền đình chỉ ngay quyền sử dụng tài khoản đăng
            nhập của các cá nhân có liên quan.
          </p>
          <p>
            2. Khi đã xác lập được nguyên nhân sự cố hay nguyên nhân sai lệch về
            thông tin, Quản lý hệ thống myDuyTan và/hoặc các Cán bộ có chức năng
            sẽ có thẩm quyền chuyển những đối tượng vi phạm sang cho khoa chủ
            quản hay Hội đồng Kỷ luật xử lý.
          </p>
          <p>
            3. Tùy theo mức độ vi phạm mà khoa chủ quản hay Hội Đồng Kỷ Luật sẽ
            quyết định hình phạt. Nhẹ thì cảnh cáo và/hoặc trừ Điểm Rèn luyện,
            nặng thì hạ bậc Hạnh kiểm Rèn luyện, nếu nghiêm trọng thì có thể bị
            buộc tạm thôi học hoặc cho THÔI HỌC LUÔN.
          </p>
        </div>
      </div>
    </div>
  );
}

export default InfoWebpart;
