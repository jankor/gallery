const fs = require('fs');
const sharp = require('sharp');

const walkSync = (dir, filelist) => {
  if( dir[dir.length-1] != '/') dir=dir.concat('/')

  files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach((file) => {
    if (fs.statSync(dir + file).isDirectory()) {
      filelist = walkSync(dir + file + '/', filelist);
    }
    else {
      if (file.includes('jpg') && !dir.includes('headers') && !file.includes('1125')) {
        filelist.push({dir, file});
      }      
    }
  });
  return filelist;
};

const images = walkSync(__dirname);

(async () => {
  
  for (const {file, dir} of images) {
    const image = sharp(dir+file)
    const metadata = await image.metadata()    
    image
      .resize(1125)
      .jpeg({
        quality: 55,
        chromaSubsampling: '4:2:0'
      })
      .toFile(`${dir}${file.slice(0, -4)}-1125.jpg`);    
  }
})();




