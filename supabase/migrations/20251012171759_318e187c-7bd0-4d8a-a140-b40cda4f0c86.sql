-- Enable pg_cron extension for scheduled jobs
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule 30-day check-in email (runs daily at 10 AM UTC)
SELECT cron.schedule(
  'send-30-day-checkin',
  '0 10 * * *',
  $$
  SELECT
    net.http_post(
        url:='https://ckuxiaftsbihfmyykbgy.supabase.co/functions/v1/send-30-day-checkin',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrdXhpYWZ0c2JpaGZteXlrYmd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyMjU0MzAsImV4cCI6MjA3NDgwMTQzMH0.OaEqRH3g21UBBXXNwUP2Igf4DEvONkwZEQDLJqpZ9g"}'::jsonb,
        body:='{}'::jsonb
    ) as request_id;
  $$
);

-- Schedule halfway reminder email (runs daily at 10 AM UTC)
SELECT cron.schedule(
  'send-halfway-reminder',
  '0 10 * * *',
  $$
  SELECT
    net.http_post(
        url:='https://ckuxiaftsbihfmyykbgy.supabase.co/functions/v1/send-halfway-reminder',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrdXhpYWZ0c2JpaGZteXlrYmd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyMjU0MzAsImV4cCI6MjA3NDgwMTQzMH0.OaEqRH3g21UBBXXNwUP2Igf4DEvONkwZEQDLJqpZ9g"}'::jsonb,
        body:='{}'::jsonb
    ) as request_id;
  $$
);

-- Schedule 30-days-left email (runs daily at 10 AM UTC)
SELECT cron.schedule(
  'send-30-days-left',
  '0 10 * * *',
  $$
  SELECT
    net.http_post(
        url:='https://ckuxiaftsbihfmyykbgy.supabase.co/functions/v1/send-30-days-left',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrdXhpYWZ0c2JpaGZteXlrYmd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyMjU0MzAsImV4cCI6MjA3NDgwMTQzMH0.OaEqRH3g21UBBXXNwUP2Igf4DEvONkwZEQDLJqpZ9g"}'::jsonb,
        body:='{}'::jsonb
    ) as request_id;
  $$
);

-- Schedule 7-days-left email (runs daily at 10 AM UTC)
SELECT cron.schedule(
  'send-expiration-reminder',
  '0 10 * * *',
  $$
  SELECT
    net.http_post(
        url:='https://ckuxiaftsbihfmyykbgy.supabase.co/functions/v1/send-expiration-reminder',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrdXhpYWZ0c2JpaGZteXlrYmd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyMjU0MzAsImV4cCI6MjA3NDgwMTQzMH0.OaEqRH3g21UBBXXNwUP2Igf4DEvONkwZEQDLJqpZ9g"}'::jsonb,
        body:='{}'::jsonb
    ) as request_id;
  $$
);

-- Schedule 2-days-left email (runs daily at 10 AM UTC)
SELECT cron.schedule(
  'send-2-days-left',
  '0 10 * * *',
  $$
  SELECT
    net.http_post(
        url:='https://ckuxiaftsbihfmyykbgy.supabase.co/functions/v1/send-2-days-left',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrdXhpYWZ0c2JpaGZteXlrYmd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyMjU0MzAsImV4cCI6MjA3NDgwMTQzMH0.OaEqRH3g21UBBXXNwUP2Igf4DEvONkwZEQDLJqpZ9g"}'::jsonb,
        body:='{}'::jsonb
    ) as request_id;
  $$
);

-- Schedule access-expired email (runs daily at 10 AM UTC)
SELECT cron.schedule(
  'send-access-expired',
  '0 10 * * *',
  $$
  SELECT
    net.http_post(
        url:='https://ckuxiaftsbihfmyykbgy.supabase.co/functions/v1/send-access-expired',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrdXhpYWZ0c2JpaGZteXlrYmd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyMjU0MzAsImV4cCI6MjA3NDgwMTQzMH0.OaEqRH3g21UBBXXNwUP2Igf4DEvONkwZEQDLJqpZ9g"}'::jsonb,
        body:='{}'::jsonb
    ) as request_id;
  $$
);