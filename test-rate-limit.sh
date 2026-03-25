#!/usr/bin/env bash
# test-rate-limit.sh
# Sends 110 rapid requests to trigger the rate limiter (limit: 100 per 15 min)


BASE_URL="http://localhost:3000"
ENDPOINT="$BASE_URL/api/users"
TOTAL=110
CONCURRENCY=20


echo "========================================"
echo "  Rate Limit Test"
echo "  Endpoint : $ENDPOINT"
echo "  Requests : $TOTAL (limit is 100)"
echo "  Mode     : parallel (concurrency=$CONCURRENCY)"
echo "========================================"
echo ""


SUCCESS=0
RATE_LIMITED=0
OTHER=0


send_request() {
 local i=$1
 STATUS=$(curl -s -o /tmp/rl_response_$i.json -w "%{http_code}" "$ENDPOINT")
 echo "Request $i → HTTP $STATUS"
 echo "$STATUS"
}


export -f send_request
export ENDPOINT


# Fire all requests in parallel and collect results
RESULTS=$(seq 1 $TOTAL | xargs -P "$CONCURRENCY" -I{} bash -c 'send_request "$@"' _ {})


# Count outcomes
while IFS= read -r line; do
 if [[ "$line" == "200" ]]; then
   ((SUCCESS++))
 elif [[ "$line" == "429" ]]; then
   ((RATE_LIMITED++))
 elif [[ "$line" =~ ^[0-9]+$ ]]; then
   ((OTHER++))
 fi
done <<< "$RESULTS"


echo ""
echo "========================================"
echo "  Results"
echo "  200 OK              : $SUCCESS"
echo "  429 Too Many Reqs   : $RATE_LIMITED"
echo "  Other               : $OTHER"
echo "========================================"


# Show one 429 response body if we got any
FIRST_429=""
for i in $(seq 1 $TOTAL); do
 if [[ -f /tmp/rl_response_$i.json ]]; then
   BODY=$(cat /tmp/rl_response_$i.json)
   if echo "$BODY" | grep -q "Too Many"; then
     FIRST_429="$BODY"
     break
   fi
 fi
done


if [[ -n "$FIRST_429" ]]; then
 echo ""
 echo "  Sample 429 response body:"
 echo "  $FIRST_429"
fi


# Cleanup temp files
rm -f /tmp/rl_response_*.json


echo ""
if [[ $RATE_LIMITED -gt 0 ]]; then
 echo "  PASS: Rate limiter is working correctly."
else
 echo "  FAIL: No 429 responses received — rate limiter may not be active."
fi
echo ""