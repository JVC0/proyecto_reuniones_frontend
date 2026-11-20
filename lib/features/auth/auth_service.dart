import 'package:flutter/foundation.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

class AuthService {
  AuthService._();

  static const String mobileRedirect =
      'https://vxagataaejcqsrojdniw.supabase.co/auth/v1/callback';

  static Future<bool> signInWithGoogle() {
    return Supabase.instance.client.auth.signInWithOAuth(
      OAuthProvider.google,
      redirectTo: kIsWeb ? null : mobileRedirect,
    );
  }
}
