  
// Define paths  
const path = require('path');  
const PATHS = {  
    app: path.join(__dirname, 'app'),  
    build: path.join(__dirname, 'build')  
};  

// A tool to merge config object  
const merge = require('webpack-merge');  
  
// Configuration for plugins  
const plugins = require('./webpack.plugins');  
  
// Common configuration for production and dev  
const common = merge(  
		
        {  
            entry: {  
                index: path.join(PATHS.app,'script','pages','index.js'),  
                list: path.join(PATHS.app,'script','pages','list.js')  
            },  
            output: {  
             path: path.join(PATHS.build,'js'),  
                filename: '[name].js',  
                chunkFilename: '[chunkhash].js'  
            },  
            resolve: {  
                root: [  
                    PATHS.app  
                ],  
                alias: {  
					img: path.join(PATHS.app,'img'), 
                    lib: path.join(PATHS.app,'script','lib'),  
                    sass: path.join(PATHS.app,'sass'),
					components: path.join(PATHS.app,'script','components')
                },  
                 extensions: ['', '.js', '.css', '.scss', '.png', '.jpg']
            },
			watch: true,
			devServer:{
				hot:true,
				inline:true,
				progress:true,
				port:9000
			}
        },  
		//plugins.copy(),  
        plugins.extractCommon('common.js'),
		plugins.sass()  
);  
  
var config = null;  
  
// Detect the branch where npm is running on  
switch(process.env.npm_lifecycle_event) {  
    case 'build':  
        config = merge(  
			plugins.clean(PATHS.build),
            common,  
            plugins.minify()
		 );  
        break;  
	case 'server':
		config = merge(  
			//plugins.clean(PATHS.build),
			common,  
            {  
                devtool: 'source-map'  
            } 
		 );  
        break; 
  
    case 'dev':  
    default:  
        config = merge(  
			plugins.clean(PATHS.build),
            common,  
            // Set source map for debug  
            {  
                devtool: 'source-map'  
            }  
        );  
        break;  	
}  
  
module.exports = config;  