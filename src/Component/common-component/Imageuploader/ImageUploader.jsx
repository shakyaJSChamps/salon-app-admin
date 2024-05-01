import { fileUploaders } from "../../../api/account.api";

export const handleOnFileSelect = async (file, type, setFieldValue) => {
    if (!file) {
        setFieldValue(type, "");
    } else {
        const fileUrl = await fileUploaders({ fileName: file.name });
        console.log(fileUrl)
        setFieldValue(type, fileUrl.data.data.path);
        const formData = new FormData();
        formData.append('file', file);
        const requestOptions = {
            method: 'PUT',
            body: file,
            headers: {
                'Content-Type': file.type,
            }
        };
        await fetch(fileUrl.data.data.url, requestOptions);
    }
};