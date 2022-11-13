import { ChangeEvent, useMemo, useState } from "react";
import classes from "./SingleCharacterInput.module.css";

function SingleCharacterInput() {
  const [value, setValue] = useState<string>("");
  const [userFeedback, setUserFeedback] = useState<string>("");

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (/[^01]/.test(event.target.value)) {
      setUserFeedback("Só 0 ou 1!");
      setValue("");
    } else {
      setUserFeedback("");
    }
    setValue(event.target.value);
  };

  const binaryToDecimal = useMemo(() => {
    const res = value
      .split("")
      .reduceRight((prev: number, cur: string, index: number, arr) => {
        const curNum = Number(cur);
        const curIndex = arr.length - 1 - index;
        return prev + curNum * Math.pow(2, curIndex);
      }, 0);

    return res;
  }, [value]);

  const result = useMemo(() => {
    try {
      if (userFeedback) {
        return "";
      }
      if (isNaN(binaryToDecimal)) return "";

      return binaryToDecimal;
    } catch (e) {
      return "";
    }
  }, [binaryToDecimal, userFeedback]);

  return (
    <div className={classes.container}>
      <div className={classes.input}>
        <label>Binário</label>
        <input
          value={value}
          className={classes.inputComponent}
          onChange={onChange}
        ></input>
        <span className={classes.userFeedback}>{userFeedback}</span>
      </div>
      <div className={classes.sign}>➡️</div>
      <div className={classes.input}>
        <label>Decimal</label>
        <input
          className={`${classes.inputComponent} ${classes.inputComponentResult}`}
          value={result}
          disabled
        ></input>
      </div>
    </div>
  );
}

export default SingleCharacterInput;
