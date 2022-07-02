import * as yup from "yup";
export const addValueValidationSchema = yup.object().shape({
    valueName: yup.string().required("الرجاء إدخال هذا الحقل"),
    ExaggerateValueName: yup.string().required("الرجاء إدخال هذا الحقل"),
    DerelictionValueName: yup.string().required("الرجاء إدخال هذا الحقل"),
    StandardValue: yup.string().required("الرجاء إدخال هذا الحقل"),
    SourcedValue: yup.string().required("الرجاء إدخال هذا الحقل"),
    LevelValue: yup.string().required("الرجاء إدخال هذا الحقل"),
    LadderValue: yup.string().required("الرجاء إدخال هذا الحقل"),
    SchoolValue: yup.string().required("الرجاء إدخال هذا الحقل"),
    TypedValue: yup.string().required("الرجاء إدخال هذا الحقل"),
    ActivationValue: yup.string().required("الرجاء إدخال هذا الحقل"),
})