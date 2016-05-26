const _ = require("lodash");
var config={
	url: "postgres://lb:linearbench15@linearbench.com/lb",
	customers: "select * from lb_customers",
	customerById: "select * from lb_customers where cus_id = $1",
	updateCustomerById: "update lb_customers set cus_name_short = $2, " +
								"cus_name_long = $3 where cus_id = $1",
	postcustomerById:"insert into lb_customers(cus_id,cus_name_short,cus_name_long, " +
					 "cus_log_modes,cus_log_type,cus_log_cloud_url,cus_log_file_path,cus_language," +
					 "cus_email,cus_login_banner) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",

	deletecustomerById: "delete from lb_customers where cus_id = $1"

};


module.exports = process.env.NODE_ENV ? _.merge(config, require("./" + process.env.NODE_ENV + ".js" || {})) : config;
