const CheckMediaType = (fileName : string) => {
    const input = document.getElementById("uploadInput") as HTMLInputElement;
    const ext = fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length);
    if(!['jpg', 'gif', 'png'].includes(ext)) {
        alert("사진 파일 외엔 선택할 수 없습니다.");
        return false;
    } else {
        console.log("IMAGE_FILE_OK");
    }
    return true;
}

export default CheckMediaType;