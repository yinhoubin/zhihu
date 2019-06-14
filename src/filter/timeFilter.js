export default function(time){
    var date=new Date(time);
    var year=date.getFullYear();
    var month=date.getMonth()+1>=10?date.getMonth()+1:'0'+(date.getMonth()+1);
    var day=date.getDate()>=10?date.getDate():'0'+date.getDate();
	var hours=date.getHours()>=10?date.getHours():'0'+date.getHours();
	var minutes=date.getMinutes()>=10?date.getMinutes():'0'+date.getMinutes();
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}