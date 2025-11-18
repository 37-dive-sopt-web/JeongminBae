import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import * as styles from "./signUpPage.css.ts";

type Props = {
  name: string;
  email: string;
  age: string;
  onChangeName: (v: string) => void;
  onChangeEmail: (v: string) => void;
  onChangeAge: (v: string) => void;
  onSubmit: () => void;
  disabled: boolean;
};

export default function SignUpPageProfile({
  name,
  email,
  age,
  onChangeName,
  onChangeEmail,
  onChangeAge,
  onSubmit,
  disabled,
}: Props) {
  return (
    <>
      <div className={styles.field}>
        <div className={styles.label}>이름</div>
        <Input
          placeholder="이름을 입력해 주세요"
          value={name}
          onChange={(e) => onChangeName(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <div className={styles.label}>이메일</div>
        <Input
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => onChangeEmail(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <div className={styles.label}>나이</div>
        <Input
          type="number"
          placeholder="숫자로 입력"
          value={age}
          onChange={(e) => onChangeAge(e.target.value)}
        />
      </div>
      <div className={styles.actions}>
        <Button type="button" fullWidth disabled={disabled} onClick={onSubmit}>
          회원가입
        </Button>
      </div>
    </>
  );
}
