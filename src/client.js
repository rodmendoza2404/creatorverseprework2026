import { createClient } from '@supabase/supabase-js';

const URL = 'https://umwaraplaihxaaqkuevd.supabase.co';

const API_KEY = 'sb_publishable_2dyjnv3ezQinLUmmfHh3cQ_Hd3ItQ5H';

export const supabase = createClient(URL, API_KEY);

