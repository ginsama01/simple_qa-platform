# Performance test results

Brief description of your computer: Windows 11 64 bit, Intel Core i7-1360P, 32GB RAM DDR4

## No Caching

### Loading course page

http_reqs: 34739  3120.318629/s
http_req_duration - median: 2.59ms
http_req_duration - 99th percentile: 7.1ms

### Loading question page

http_reqs: 18684  1867.436608/s
http_req_duration - median: 4.95ms
http_req_duration - 99th percentile: 11.91ms

### Loading answer page

http_reqs: 21396  2138.312949/s
http_req_duration - median: 4.2ms
http_req_duration - 99th percentile: 11.33ms

### Add question

http_reqs: 8932   891.973323/s
http_req_duration - median: 10.65ms
http_req_duration - 99th percentile: 29.37ms

### Add answer

http_reqs: 16052  1603.970621/s
http_req_duration - median: 5.34ms
http_req_duration - 99th percentile: 14.39ms

## Caching with Redis

### Loading course page

http_reqs: 22427  2241.957329/s
http_req_duration - median: 4.13ms
http_req_duration - 99th percentile: 10.58ms

### Loading question page

http_reqs: 14889  1487.617406/s
http_req_duration - median: 6.26ms
http_req_duration - 99th percentile: 14.87ms

### Loading answer page

http_reqs: 13653  1363.699249/s
http_req_duration - median: 6.09ms
http_req_duration - 99th percentile: 23.81ms

### Add question

http_reqs: 10116  1010.285538/s
http_req_duration - median: 8.94ms
http_req_duration - 99th percentile: 28.17ms

### Add answer

http_reqs: 8538   853.168169/s
http_req_duration - median: 10.91ms
http_req_duration - 99th percentile: 25.2ms