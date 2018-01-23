export const alloyDebug = (to,next) =>{
	require('alloylever')
	if(!to.query.vconsole){
	    to.query.vconsole = 'show'
	    next({
	        path:to.path,
	        query:to.query
	    })
	}else{
	    next()
	}
}