import { validateValue, ValidationType } from "./validate-value";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { MultiSelect } from "primereact/multiselect";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { IconEnum } from "@/enums/icon-enum";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";

type OptionType = {
  label: string;
  value: string;
};

export enum FieldSizeEnum {
  small = 3,
  medium = 6,
  large = 9,
  full = 12,
}

type InputType = {
  name: string;
  type:
  | "text"
  | "email"
  | "password"
  | "number"
  | "file"
  | "checkbox"
  | "radio"
  | "select"
  | "multiselect"
  | "textarea"
  | "date";
  size: FieldSizeEnum;
  label: string;
  value: string | Date | string[];
  placeholder: string;
  validators: ValidationType[];
  disabled?: boolean;
  options?: OptionType[];
  onFilter?: (value: string) => void;
};

type ButtonType = {
  type: "submit" | "button";
  text: string;
  onClick?: () => any;
  color: "primary" | "secondary" | "success" | "info" | "warning" | "danger";
  icon?: IconEnum;
};

type AnchorType = {
  text: string;
  href: string;
};

type Props = {
  title: string;
  onSubmit: (data: any) => Promise<void>;
  inputs: InputType[];
  buttons: ButtonType[];
  anchors: AnchorType[];
};

export const Form = ({ title, onSubmit, inputs, buttons, anchors }: Props) => {
  const [inputValues, setInputValues] = useState<any>({});
  const [inputErrors, setInputErrors] = useState<any>({});
  const [formLoading, setFormLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);

  useEffect(() => {
    let values: any = {};
    inputs.forEach((input) => {
      if (input.value) {
        values[input.name] = input.value;
      } else {
        values[input.name] = "";
      }
    });

    setInputValues(values);
  }, []);

  const validateField = (name: string, value: any) => {
    const validators = inputs.find((input) => input.name === name)?.validators;
    if (validators) {
      const errors = inputErrors;
      const message = validateValue(value, validators);
      if (message) {
        errors[name] = message;
      } else {
        delete errors[name];
      }
      setInputErrors(errors);
    }
  };

  const validateAllFields = () => {
    const errors = {} as any;
    inputs.forEach((input) => {
      const message = validateValue(inputValues[input.name], input.validators);
      if (message) {
        errors[input.name] = message;
      }
    });
    setInputErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const customBase64Uploader = async (fieldName: string, event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    let blob = await fetch(file.objectURL).then((r) => r.blob());
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      const base64data = reader.result;
      setInputValues({
        ...inputValues,
        [fieldName]: { name: file.name, value: String(base64data) },
      });
      validateField(fieldName, base64data);
    };
  };

  const getUserDateFormat = (): string => {
    const testDate = new Date(2024, 1, 3); // February 3, 2024
    const formattedDate = testDate.toLocaleDateString(undefined, {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });
    const parts = formattedDate.match(/\d{2}/g);
    const separators = formattedDate.match(/[^0-9]/g) || ["/"];

    if (!parts || parts.length !== 3) {
      throw new Error("Unexpected date format");
    }
    const dateMap = {
      [parts[0]]: "dd",
      [parts[1]]: "mm",
      [parts[2]]: "yy",
    };

    return parts.map((part) => dateMap[part]).join(separators[0]);
  };

  const submitForm = async (event: any) => {
    {
      event.preventDefault();

      if (!validateAllFields()) {
        return;
      }

      const formData = new FormData(event.target as any);
      const data = {} as any;
      formData.forEach((value, key) => {
        data[key] = value;
      });

      setFormLoading(true);
      try {
        await onSubmit(inputValues);
      }
      catch (error) {}
      setFormLoading(false);
    }
  };

  const showErrorMessage = (name: string) => {
    const error = inputErrors[name];
    if (error) {
      return (
        <div className="text-center w-full">
          <small className="p-error">{error}</small>
          <br />
        </div>
      );
    }
  };

  return (
    <form className="w-full" onSubmit={submitForm}>
      <h3 className="text-2xl font-bold text-center mb-3">{title}</h3>
      <div className="grid">
        {inputs.map((input, index) => (
          <div
            key={index}
            className={`col-12 md:col-${input.size * 2} lg:col-${input.size}`}
          >
            {input.type === "textarea" ? (
              <>
                {showErrorMessage(input.name)}
                <label className="text-left font-bold" htmlFor={input.name}>
                  {input.label}
                </label>
                <InputTextarea
                  invalid={input.name in inputErrors}
                  name={input.name}
                  placeholder={input.placeholder}
                  className="w-full"
                  disabled={input.disabled}
                  rows={input.size}
                  value={
                    input.name in inputValues ? inputValues[input.name] : ""
                  }
                  onChange={(e) => {
                    setInputValues({
                      ...inputValues,
                      [input.name]: e.target.value,
                    });
                    validateField(input.name, e.target.value);
                  }}
                />
              </>
            ) : input.type === "select" ? (
              <>
                {showErrorMessage(input.name)}
                <label className="font-bold" htmlFor={input.name}>
                  {input.label}
                </label>
                <Dropdown
                  invalid={input.name in inputErrors}
                  filter
                  onFilter={(event) => {
                    input.onFilter && input.onFilter(event.filter);
                  }}
                  className="w-full"
                  name={input.name}
                  value={
                    input.name in inputValues ? inputValues[input.name] : ""
                  }
                  onChange={(e) => {
                    setInputValues({
                      ...inputValues,
                      [input.name]: e.value,
                    });
                    validateField(input.name, e.target.value);
                  }}
                  disabled={input.disabled}
                  placeholder={input.placeholder}
                  options={(input.options || []).map((option) => ({
                    name: option.label,
                    value: option.value,
                  }))}
                  optionLabel="name"
                />
              </>
            ) : input.type === "multiselect" ? (
              <>
                {showErrorMessage(input.name)}
                <label className="font-bold" htmlFor={input.name}>
                  {input.label}
                </label>
                <MultiSelect
                  display="chip"
                  invalid={input.name in inputErrors}
                  filter
                  onFilter={(event) => {
                    input.onFilter && input.onFilter(event.filter);
                  }}
                  className="w-full"
                  name={input.name}
                  value={
                    input.name in inputValues ? inputValues[input.name] : ""
                  }
                  onChange={(e) => {
                    setInputValues({
                      ...inputValues,
                      [input.name]: e.value,
                    });
                    validateField(input.name, e.target.value);
                  }}
                  disabled={input.disabled}
                  placeholder={input.placeholder}
                  options={(input.options || []).map((option) => ({
                    name: option.label,
                    value: option.value,
                  }))}
                  optionLabel="name"
                />
              </>
            ) : input.type === "date" ? (
              <>
                {showErrorMessage(input.name)}
                <label className="font-bold" htmlFor={input.name}>
                  {input.label}
                </label>
                <Calendar
                  invalid={input.name in inputErrors}
                  dateFormat={getUserDateFormat()}
                  className="w-full"
                  value={
                    input.name in inputValues ? inputValues[input.name] : ""
                  }
                  onChange={(e) => {
                    setInputValues({ ...inputValues, [input.name]: e.value });
                    validateField(input.name, e.target.value);
                  }}
                />
              </>
            ) : input.type === "radio" ? (
              <>
                {showErrorMessage(input.name)}
                <div className="flex justify-content-center w-full flex-wrap gap-2">
                  <label className="font-bold" htmlFor={input.name}>
                    {input.label}:
                  </label>
                </div>
                <div className="flex justify-content-center w-full flex-wrap gap-2">
                  {input.options &&
                    input.options.map((option, idx) => (
                      <div className="flex items-center" key={idx}>
                        <RadioButton
                          invalid={input.name in inputErrors}
                          inputId={option.label}
                          type={input.type}
                          name={input.name}
                          disabled={input.disabled}
                          checked={inputValues[input.name] === option.value}
                          value={option.value}
                          onChange={(e) => {
                            setInputValues({
                              ...inputValues,
                              [input.name]: e.target.value,
                            });
                            validateField(input.name, e.target.value);
                          }}
                        />
                        <label
                          key={idx}
                          htmlFor={option.label}
                          className="ml-2"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                </div>
              </>
            ) : input.type === "file" ? (
              <div className="flex justify-content-center w-full flex-wrap gap-2">
                {showErrorMessage(input.name)}
                <Button
                  type="button"
                  label={
                    inputValues[input.name]
                      ? inputValues[input.name].name
                      : input.label
                  }
                  icon={
                    inputValues[input.name] ? "pi pi-check" : "pi pi-upload"
                  }
                  className="p-button"
                  onClick={() => {
                    document.getElementsByName(input.name)[0].click();
                  }}
                />
                {inputValues[input.name] && (
                  <Button
                    type="button"
                    icon="pi pi-trash"
                    className="p-button p-button-danger"
                    onClick={() => {
                      setInputValues({
                        ...inputValues,
                        [input.name]: null,
                      });
                      (document.getElementsByName(input.name)[0] as any).value =
                        "";
                    }}
                  />
                )}
                <input
                  className="hidden"
                  type={input.type}
                  name={input.name}
                  placeholder={input.placeholder}
                  onChange={(e) => customBase64Uploader(input.name, e)}
                  disabled={input.disabled}
                />
              </div>
            ) : input.type === "checkbox" ? (
              <>
                {showErrorMessage(input.name)}
                <div className="flex justify-content-center w-full">
                  <label
                    className="mr-2 font-bold font-bold"
                    htmlFor={input.name}
                  >
                    {input.label}
                  </label>
                  <Checkbox
                    invalid={input.name in inputErrors}
                    type={input.type}
                    name={input.name}
                    placeholder={input.placeholder}
                    checked={
                      input.name in inputValues
                        ? inputValues[input.name] != ""
                        : false
                    }
                    disabled={input.disabled}
                    onChange={(e) => {
                      setInputValues({
                        ...inputValues,
                        [input.name]: e.target.checked,
                      });
                      validateField(input.name, e.target.checked);
                    }}
                  />
                </div>
              </>
            ) : input.type === "password" ? (
              <>
                {showErrorMessage(input.name)}
                <label className="font-bold" htmlFor={input.name}>
                  {input.label}
                </label>
                <div className="p-inputgroup flex-1">
                  <InputText
                    invalid={input.name in inputErrors}
                    className="w-full"
                    type={showPasswords ? 'text' : input.type}
                    name={input.name}
                    placeholder={input.placeholder}
                    disabled={input.disabled}
                    value={
                      input.name in inputValues ? inputValues[input.name] : ""
                    }
                    onChange={(e) => {
                      setInputValues({
                        ...inputValues,
                        [input.name]: e.target.value,
                      });
                      validateField(input.name, e.target.value);
                    }}
                  />
                  <span className="p-inputgroup-addon" onClick={() => setShowPasswords(!showPasswords)}>
                    <i className={`pi ${showPasswords ? IconEnum.eye_slash : IconEnum.eye}`}></i>
                  </span>
                </div>
              </>
            ) : (
              <>
                {showErrorMessage(input.name)}
                <label className="font-bold" htmlFor={input.name}>
                  {input.label}
                </label>
                <InputText
                  invalid={input.name in inputErrors}
                  className="w-full"
                  type={input.type}
                  name={input.name}
                  placeholder={input.placeholder}
                  disabled={input.disabled}
                  value={
                    input.name in inputValues ? inputValues[input.name] : ""
                  }
                  onChange={(e) => {
                    setInputValues({
                      ...inputValues,
                      [input.name]: e.target.value,
                    });
                    validateField(input.name, e.target.value);
                  }}
                />
              </>
            )}
          </div>
        ))}
      </div>

      {buttons.length > 0 && (
        <div className="flex justify-content-center w-full gap-2 flex-wrap mt-4">
          {buttons.map((button, index) => (
            <Button
              loading={formLoading}
              key={index}
              type={button.type}
              onClick={button.onClick}
              className={`p-button p-button-${button.color}`}
              label={button.text}
              icon={button.icon && `pi ${button.icon}`}
            />
          ))}
        </div>
      )}
      {anchors.length > 0 && (
        <div className="flex justify-content-center w-full gap-2 flex-wrap mt-4">
          {anchors.map((anchor, index) => (
            <Button
              type="button"
              className="underline"
              key={index}
              label={anchor.text}
              link
              onClick={() => (window.location.href = anchor.href)}
            />
          ))}
        </div>
      )}
    </form>
  );
};
