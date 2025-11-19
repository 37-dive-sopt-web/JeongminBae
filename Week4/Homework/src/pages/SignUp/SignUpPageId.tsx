import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import * as styles from "./signUpPage.css.ts";
import { vars } from "@/styles/theme.css.ts";

type Props = {
  username: string;
  onChange: (v: string) => void;
  tooLong: boolean;
  onNext: () => void;
  disabled: boolean;
};

export default function SignUpPageId({ username, onChange, tooLong, onNext, disabled }: Props) {
  return (
    <>
      <div className={styles.field}>
        <div className={styles.label}>아이디</div>
        <Input
          type="text"
          placeholder="아이디를 입력해 주세요"
          value={username}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      {tooLong && (
        <p style={{ color: vars.color.error, fontSize: 13, margin: "4px 0 8px" }}>
          아이디는 50자 이하로 입력해 주세요.
        </p>
      )}
      <div className={styles.actions}>
        <Button type="button" fullWidth disabled={disabled} onClick={onNext}>
          다음
        </Button>
      </div>
    </>
  );
}
