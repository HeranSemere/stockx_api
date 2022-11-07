-----------------------------------------------------------------------------------------------------------------------------------------------
CREATE TABLE company(
    company_id SERIAL PRIMARY KEY,
    company_name VARCHAR(225),
    company_symbol VARCHAR(225),
    company_description VARCHAR(500),
    current_price float,
    UNIQUE(company_symbol)
);

insert into company(company_name, company_symbol, company_description,current_price) values('Tesla','TSLA','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',102.5 );
insert into company(company_name, company_symbol, company_description,current_price) values('Visa Inc.','V','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',111.10 );
insert into company(company_name, company_symbol, company_description,current_price) values('Walmart Inc.','WMT','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',80.5 );
insert into company(company_name, company_symbol, company_description,current_price) values('Meta Platforms, Inc.','META','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',177.32 );
insert into company(company_name, company_symbol, company_description,current_price) values('Chevron Corporation','CVX','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',142.1 );
insert into company(company_name, company_symbol, company_description,current_price) values('NVIDIA Corporation','NVDA','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',181.90 );
insert into company(company_name, company_symbol, company_description,current_price) values('Mastercard Incorporated','MA','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',121.2 );
insert into company(company_name, company_symbol, company_description,current_price) values('Home Depot','HD','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',95.3 );
insert into company(company_name, company_symbol, company_description,current_price) values('JP Morgan Chase & Co.','JPM','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',153.7 );
insert into company(company_name, company_symbol, company_description,current_price) values('Johnson & Johnson','JNJ','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',65.34);
insert into company(company_name, company_symbol, company_description,current_price) values('Bank of America','BAC','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',99.9 );
insert into company(company_name, company_symbol, company_description,current_price) values('Amazon.com Inc.','AMZN','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',108.34 );
insert into company(company_name, company_symbol, company_description,current_price) values('Microsoft Corporation','MSFT','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',237.45 );
insert into company(company_name, company_symbol, company_description,current_price) values('Alphabet Inc','GOOGL','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',200 );
insert into company(company_name, company_symbol, company_description,current_price) values('General Electric Company','GE','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',199.8 );
insert into company(company_name, company_symbol, company_description,current_price) values('Apple','APLE','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',153.99 );
insert into company(company_name, company_symbol, company_description,current_price) values('AT&T Inc.','T','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',55.5 );

CREATE TABLE watchlist(
    watchlist_id SERIAL PRIMARY KEY,
    company_symbol VARCHAR(225),
    email VARCHAR(225),
    CONSTRAINT fk_user_and_watchlist
      FOREIGN KEY(email) 
	  REFERENCES investor(email)
	  ON DELETE CASCADE
);

CREATE TABLE investor(
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(225),
    fathers_name VARCHAR(225),
    grandfathers_name VARCHAR(225),
    email VARCHAR(225),
    phone VARCHAR(225),
    country_of_citizenship VARCHAR(225),
    tinnumber VARCHAR(225),
    goverment_id VARCHAR(225),
    password VARCHAR(225),
    account_disabled boolean default false,
    profile_pic VARCHAR(225),
    token VARCHAR(225),
    UNIQUE(email),
    UNIQUE(tinnumber)
);

CREATE TABLE stop_buy_order(
    order_id SERIAL PRIMARY KEY,
    company_symbol VARCHAR(225),
    shares INT,
    stop_price float,
    expire VARCHAR(225),
    status VARCHAR(225) default 'Pending',
    total_price float,
    email VARCHAR(225),
    CONSTRAINT fk_user_and_stop_buy_order
      FOREIGN KEY(email) 
	  REFERENCES investor(email)
	  ON DELETE CASCADE
);

CREATE TABLE stop_sell_order(
    order_id SERIAL PRIMARY KEY,
    company_symbol VARCHAR(225),
    shares INT,
    stop_price float,
    total_price float,
    expire VARCHAR(225),
    status VARCHAR(225) default 'Pending',
    email VARCHAR(225),
    CONSTRAINT fk_user_and_stop_sell_order
      FOREIGN KEY(email) 
	  REFERENCES investor(email)
	  ON DELETE CASCADE
);

CREATE TABLE market_buy_order(
    order_id SERIAL PRIMARY KEY,
    company_symbol VARCHAR(225),
    shares INT,
    total_price float,
    status VARCHAR(225) default 'Pending',
    email VARCHAR(225),
    CONSTRAINT fk_user_and_market_buy_order
      FOREIGN KEY(email) 
	  REFERENCES investor(email)
	  ON DELETE CASCADE
);

CREATE TABLE market_sell_order(
    order_id SERIAL PRIMARY KEY,
    company_symbol VARCHAR(225),
    shares INT,
    total_price float,
    status VARCHAR(225) default 'Pending',
    email VARCHAR(225),
    CONSTRAINT fk_user_and_market_sell_order
      FOREIGN KEY(email) 
	  REFERENCES investor(email)
	  ON DELETE CASCADE
);


CREATE TABLE limit_buy_order(
    order_id SERIAL PRIMARY KEY,
    company_symbol VARCHAR(225),
    shares INT,
    limit_price float,
    total_price float,
    expire VARCHAR(225),
    status VARCHAR(225) default 'Pending',
    email VARCHAR(225),
    CONSTRAINT fk_user_and_limit_buy_order
      FOREIGN KEY(email) 
	  REFERENCES investor(email)
	  ON DELETE CASCADE
);


CREATE TABLE limit_sell_order(
    order_id SERIAL PRIMARY KEY,
    company_symbol VARCHAR(225),
    shares INT,
    limit_price float,
    total_price float,
    expire VARCHAR(225),
    status VARCHAR(225) default 'Pending',
    email VARCHAR(225),
    CONSTRAINT fk_user_and_limit_sell_order
      FOREIGN KEY(email) 
	  REFERENCES investor(email)
	  ON DELETE CASCADE
);


CREATE TABLE stocks(
    stock_id SERIAL PRIMARY KEY,
    company_symbol VARCHAR(225),
    shares INT,
    email VARCHAR(225),
    CONSTRAINT fk_user_and_stock
      FOREIGN KEY(email) 
	  REFERENCES investor(email)
	  ON DELETE CASCADE
);


CREATE TABLE administrator(
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(225),
    fathers_name VARCHAR(225),
    grandfathers_name VARCHAR(225),
    email VARCHAR(225),
    phone VARCHAR(225),
    password VARCHAR(225),
    token VARCHAR(225),
    UNIQUE(email)
);

INSERT INTO administrator(first_name, fathers_name, grandfathers_name, email, phone, password) values('Abebe', 'Zewde', 'Welde')
