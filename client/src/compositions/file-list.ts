import {ref} from 'vue';

export default function () {
    const files = ref([])

    function addFiles(newFiles:any) {
        console.log(newFiles);
        const newUploadableFiles:any[] = [...newFiles]
            .map((file) => new UploadableFile(file))
            .filter((file) => !fileExists(file.id))
        files.value = files.value.concat(newUploadableFiles as never[])
    }

    function fileExists(otherId:string) {
        return files.value.some(({ id }) => id === otherId)
    }

    function removeFile(file:any) {
        const index = (files.value as any[]).indexOf(file)

        if (index > -1) files.value.splice(index, 1)
    }

    return { files, addFiles, removeFile }
}

class UploadableFile {
    public file;
    public id;
    public url;
    public status:any;
    constructor(file:any) {
        this.file = file
        this.id = `${file.name}-${file.size}-${file.lastModified}-${file.type}`
        this.url = URL.createObjectURL(file)
        this.status = null
    }
}