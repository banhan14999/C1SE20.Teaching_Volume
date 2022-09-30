import classNames from "classnames/bind";
import styles from "./infowebpart.module.scss";
const cx = classNames.bind(styles);

function InfoWebpart() {
  return (
    <div>
      <div className={cx("form")}>
        <div className={cx("line")}>
          <h2 className="text-xl font-semibold text-red-700">
            NỘI QUY SỬ DỤNG HỆ THỐNG PORTAL MYDUYTAN
          </h2>
        </div>
        <div className="p-5 text-sm">
          <p>
            Khi sử dụng Hệ thống Portal myDuyTan, mỗi Sinh viên/Học viên phải
            tuyệt đối tuân thủ các quy định sau:
          </p>
          <p className="mt-[10px]">
            <strong>
              <u>ĐỐI VỚI SINH VIÊN/HỌC VIÊN:</u>
            </strong>
          </p>
          <p className="mt-[10px]">
            <strong>1.</strong> Mọi Sinh viên/Học viên khi tham gia sử dụng hệ
            thống portal MyDuyTan phải chịu trách nhiệm hoàn toàn về sự xác thực
            và tính chính xác của mọi thông tin mình cập nhật, đăng ký, đăng
            tải,…;
          </p>
          <p>
            <b>2.</b> Nghiêm cấm mọi hành vi phá hoại hệ thống MyDuyTan dưới mọi
            hình thức, khiến hệ thống không tiếp tục hoạt động, bằng các tiểu
            xảo kỹ thuật hay bằng những thông tin sai lệch;
          </p>
          <p>
            <b>3.</b> Mỗi Sinh viên/Học viên có trách nhiệm quản lý thông tin
            tài khoản, mật khẩu đăng nhập và
            <b className="text-red-600"> Mã số Sinh viên/Học viên</b> của mình.
            Không được tiết lộ thông tin tài khoản cá nhân của mình cho bất kỳ
            một cá nhân hay tổ chức nào khác;
          </p>
          <p>
            <b>4.</b> Sinh viên/Học viên chịu hoàn toàn trách nhiệm về các hành
            vi thực hiện thông qua tài khoản của mình nếu để lộ thông tin (đăng
            nhập) tài khoản cá nhân.
          </p>
          <p>
            <b>5.</b> Nghiêm cấm hành vi dùng Email trường cấp (…
            <b>@dtu.edu.vn</b>) cho các mục đích spam hay phát tán thông tin sai
            lệch, đồi trụy hoặc phản động;
          </p>
          <p>
            <b>6.</b> Không được sử dụng các hình ảnh dễ gây hiểu nhầm, kinh dị,
            đồi trụy, phản động hay trái với thuần phong mỹ tục của người Việt
            Nam cho <b>Avatar</b> (hình ảnh biểu trưng) của tài khoản cá nhân).
          </p>
          <p>
            <b>7.</b> Kích thước Avatar không được quá 130 x 130 pixel (hay
            3,67cm x 3,67cm) và dung lượng không được lớn hơn 150 KB;
          </p>
          <p>
            <b>8.</b> Sinh viên/Học viên <b>ở học kỳ đầu</b> (hay trong một số
            trường hợp, ở năm đầu) phải tuân thủ việc phân bổ môn học của nhà
            trường.
          </p>
          <p>
            <b>9.</b> Sinh viên/Học viên cam kết chịu trách nhiệm hoàn toàn về
            những quyết định <b className="text-red-600">Đăng ký Môn học</b> của
            mình theo từng học kỳ (sau học kỳ đầu tiên) trên myDuyTan. Những
            quyết định <b>đăng ký môn, bỏ môn, thôi môn</b> sẽ ảnh hưởng đến
            tiến độ học nhanh hay chậm của sinh viên cũng như gián tiếp tác động
            đến kết quả học tập cuối cùng cho kỳ học đó.
          </p>
          <p>
            <b>10.</b> Sinh viên/Học viên có quyền và chịu trách nhiệm với các
            quyết định xin thay đổi <b>Cố vấn Học tập</b> của mình. Việc cuối
            cùng có thay đổi được Cố vấn Học tập hay không lại tùy thuộc vào xét
            duyệt của nhà trường.
          </p>
          <p>
            <b>11.</b> Trong quá trình học tập, Sinh viên/Học viên sẽ sử dụng
            myDuyTan (mà chủ yếu là hệ thống eLearning{" "}
            <b className="text-blue-600">SAKAI</b>) để đăng tải thông tin, ý
            kiến, ý tưởng của bản thân cũng như để nộp bài, làm bài, thi cử,...
            Sinh viên được yêu cầu sử dụng các quy cách sau cho những thông tin
            đăng tải trực tiếp hay qua các tập tin được tải lên:
          </p>
          <p>
            <strong>Qui định về Chữ viết:</strong>
          </p>

          <ul className="list-[circle] indent-[20px] ">
            <li>
              <p>
                Cỡ chữ: rõ ràng, dễ nhìn, dễ đọc, nên có kích thước từ 12 pt trở
                lên,
              </p>
            </li>
            <li>
              <p>Định dạng: Unicode,</p>
            </li>
            <li>
              <p>
                Font chữ: tránh dùng các font chữ uốn éo, to bản, lệch pha,...
                trong các văn bản có tính quy phạm,
              </p>
            </li>
            <li>
              <p>
                Màu chữ: không dùng màu trắng (trừ khi trên nền đen hay nền màu
                sậm) và hạn chế dùng (toàn bộ) màu đỏ (trừ khi để chỉ những
                thông tin quan trọng hay cấp thiết).
              </p>
            </li>
          </ul>
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
            <b>12.</b> Kích thước của các tập tin tải lên các hệ thống của
            myDuyTan nên <b>từ 10 MB trở xuống.</b>
          </p>
          <p>
            <b>13.</b> Sinh viên có trách nhiệm thường xuyên theo dõi <b className="text-red-600">Lịch học</b>
            (hay thời khóa biểu) của bản thân để đến lớp và ra về đúng giờ và
            không đến lớp khi Lịch học đã bị thay đổi.
          </p>
          <p>
            <b>14.</b> Sinh viên có trách nhiệm thường xuyên theo dõi <b className="text-red-600">Bảng điểm</b>
            (Tổng kết các Học phần) và <b className="text-red-600">Bảng điểm Cụ thể</b> (từng Học phần) của bản
            thân để quản lý tiến độ và nỗ lực học tập của mình.
          </p>
          <p>
            <b>15.</b> Sinh viên có trách nhiệm thường xuyên theo dõi <b>Tin tức (&
            Sự kiện)</b> và <b>Thông báo</b> trên myDuyTan để nắm tình hình hoạt động và
            các sự kiện đang diễn ra ở khoa chủ quản cũng như tại các đơn vị
            khác trong toàn trường.
          </p>
          <p>
            <b>16.</b> Khi phát hiện bất kỳ sai lệch hay thiếu sót nào về thông
            tin cá nhân, môn học đăng ký, cố vấn học tập, thời lịch, điểm số,
            quên mật khẩu,... trong tài khoản myDuyTan của mình thì sinh viên có
            thể đến:
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
            <strong><u>XỬ PHẠT VI PHẠM:</u></strong>
          </p>
          <p>
            <b>1.</b> Khi phát hiện ra bất kỳ biểu hiện nào vi phạm một trong
            những quy định kể trên, Quản lý hệ thống myDuyTan và/hoặc các Cán bộ
            có chức năng sẽ có thẩm quyền <b className="text-red-600">đình chỉ ngay quyền sử dụng</b> tài khoản
            đăng nhập của các cá nhân có liên quan.
          </p>
          <p>
            <b>2.</b> Khi đã xác lập được nguyên nhân sự cố hay nguyên nhân sai
            lệch về thông tin, Quản lý hệ thống myDuyTan và/hoặc các Cán bộ có
            chức năng sẽ có thẩm quyền chuyển những đối tượng vi phạm sang cho
            <b>khoa chủ quản</b> hay <b>Hội đồng Kỷ luật</b> xử lý.
          </p>
          <p>
            <b>3.</b> Tùy theo mức độ vi phạm mà khoa chủ quản hay Hội Đồng Kỷ
            Luật sẽ quyết định hình phạt. Nhẹ thì cảnh cáo và/hoặc <b>trừ Điểm Rèn
            luyện</b>, nặng thì <b>hạ bậc Hạnh kiểm Rèn luyện</b>, nếu nghiêm trọng thì có
            thể bị buộc <b>tạm thôi học</b> hoặc cho <b className="text-red-600">THÔI HỌC LUÔN.</b>
          </p>
        </div>
      </div>
    </div>
  );
}

export default InfoWebpart;
