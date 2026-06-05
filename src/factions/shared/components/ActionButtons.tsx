import type { Translation } from "../../../languages";

interface Props {
  onSave: () => void;
  onClear: () => void;
  justSaved: boolean;
  disabled: boolean;
  t: Translation;
}

export default function ActionButtons({ onSave, onClear, justSaved, disabled, t }: Props) {
  return (
    <div className="btn-row">
      <button
        className={`stfc-btn${justSaved ? " saved" : ""}`}
        onClick={onSave}
        disabled={disabled}
      >
        {justSaved ? t.msg_saved : t.btn_calc}
      </button>
      <button className="stfc-btn" onClick={onClear}>
        {t.btn_clear}
      </button>
    </div>
  );
}
