// const successServer = "http://212.64.1.189:8180/zjzx";
const successServer = "http://212.64.1.189:8080/zjzx";
// const successServer = "http://192.168.2.110:8080/zjzx";
const fileServer = "http://212.64.1.189:9180/zjzx_file"
const fileRoot = "http://212.64.1.189:9180/fileserver"
const userid = localStorage.getItem('id');
const token = localStorage.getItem('token');
export default {
	successServer,
	fileServer,
	fileRoot,
	userid,
	token
}
