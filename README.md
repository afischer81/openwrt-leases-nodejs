# openwrt-leases-nodejs

Web application to show the DHCP leases of [OpenWRT](https://openwrt.org/) based on nodejs express

The current DHCP leases are parsed by a Python script [dhcp_leases.py](dhcp_leases.py) that is regularly executed via a crontab entry. The script converts the lease file of the [dnsmasq DHCP server](https://openwrt.org/docs/guide-user/base-system/dhcp.dnsmasq) (/tmp/dhcp.leases) to a CSV file in a dedicated directory. The CSV is parsed by a [nodejs](https://nodejs.org/) based web application that displays the lease information in table via the [DataTables](https://www.datatables.net/) javascript package. The CSV is parsed with the [PapaParse](https://www.papaparse.com/) package.

## Prerequisites

OpenWRT with 
* dnsmasq DHCP server
* docker
* python

## Installation

* adjust 
  * CSV file location in [dhcp_leases.py](dhcp_leases.py), [image/netzwerk.js](image/netzwerk.js)
  * port number in [install.sh](install.sh)
* install Python script
  ```
  ./install.sh install
  ```
  add the following line to /etc/crontabs/root
  ```
  * * * * * /usr/local/sbin/dhcp_leases.py
  ```
* build the docker images for the web application
  ```
  ./install.sh build
  ```
* start the docker container
  ```
  ./install.sh run
  ```

## Usage

* access the web page via the URL http://<OpenWRT_IP>:8081/
