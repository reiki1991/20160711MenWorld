function selectFileImage(fileObj,callback) {
	var file = fileObj.files['0'];
	//图片方向角
	var Orientation = null;
	
	if (file) {
		//App.tip("正在上传,请稍后...");
		var rFilter = /^(image\/jpeg|image\/png)$/i; // 检查图片格式
		if (!rFilter.test(file.type)) {
            App.tip("请选择jpeg、png格式的图片");
			return;
		}
		//获取照片方向角属性，用户旋转控制
		EXIF.getData(file, function() {
		    EXIF.getAllTags(this);
		    Orientation = EXIF.getTag(this, 'Orientation');
		});

        var maxW = 800, maxH = 1200;
		var oReader = new FileReader();
		oReader.onload = function(e) {
			var image = new Image();
			image.src = e.target.result;
			image.onload = function() {
				var expectWidth = this.naturalWidth;
				var expectHeight = this.naturalHeight;
				
				if (this.naturalWidth > this.naturalHeight && this.naturalWidth > maxW) {
					expectWidth = maxW;
					expectHeight = expectWidth * this.naturalHeight / this.naturalWidth;
				} else if (this.naturalHeight > this.naturalWidth && this.naturalHeight > maxH) {
					expectHeight = maxH;
					expectWidth = expectHeight * this.naturalWidth / this.naturalHeight;
				}
				var canvas = document.createElement("canvas");
				var ctx = canvas.getContext("2d");
				canvas.width = expectWidth;
				canvas.height = expectHeight;
				ctx.drawImage(this, 0, 0, expectWidth, expectHeight);

                //矫正ios图片方向旋转问题
				var mpImg = new MegaPixImage(image);
					mpImg.render(canvas, {
						maxWidth: maxW,
						maxHeight: maxH,
						quality: 0.9,
						orientation: Orientation
					});
					
				var base64 = canvas.toDataURL("image/jpeg");
                callback && callback(base64);
			};
		};
		oReader.readAsDataURL(file);
	}
}