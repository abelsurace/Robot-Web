#!/bin/sh

STREAMER=/usr/local/bin/mjpg_streamer
HTTP_PORT=5002

$STREAMER -i "/usr/local/lib/input_uvc.so" -o "/usr/local/lib/output_http.so -w /usr/local/www -p $HTTP_PORT"