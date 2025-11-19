import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import * as styles from "./signUpPage.css.ts";
import { vars } from "@/styles/theme.css.ts";


type Props = {
  password: string;
  confirm: string;
  onChangePassword: (v: string) => void;
  onChangeConfirm: (v: string) => void;
  onNext: () => void;
  disabled: boolean;
};

export default function SignUpPagePassword({
  password,
  confirm,
  onChangePassword,
  onChangeConfirm,
  onNext,
  disabled,
}: Props) {
  const notOk = !!(password || confirm) && disabled;

  return (
    <>
      <div className={styles.field}>
        <div className={styles.label}>비밀번호 (8자 이상)</div>
        <Input
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          value={password}
          onChange={(e) => onChangePassword(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <div className={styles.label}>비밀번호 확인</div>
        <Input
          type="password"
          placeholder="비밀번호를 다시 입력해 주세요"
          value={confirm}
          onChange={(e) => onChangeConfirm(e.target.value)}
        />
      </div>

      {notOk ? (
        <p style={{ color: vars.color.error, fontSize: 13, margin: "4px 0 8px" }}>
          비밀번호 8자 이상, 두 칸이 같아야 합니다.
        </p>
      ) : null}

      <div className={styles.actions}>
        <Button type="button" fullWidth disabled={disabled} onClick={onNext}>
          다음
        </Button>
      </div>
    </>
  );
}
