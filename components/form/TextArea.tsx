import {Label} from "../ui/label";
import {Textarea} from "../ui/textarea";

type TextAreaInputProps = {
  name: string;
  labelText?: string;
  defaultValue?: string;
};

function TextArea({name, labelText, defaultValue}: TextAreaInputProps) {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="calitalize">
        {labelText || name}
      </Label>
      <Textarea
        id={name}
        name={name}
        defaultValue={defaultValue}
        rows={5}
        required
        className="leading-loose"
      />
    </div>
  );
}
export default TextArea;
