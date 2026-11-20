import 'package:flutter/foundation.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

class AuthService {
  AuthService._();

  static const String mobileRedirect =
      'io.supabase.reuniones://login-callback/';

  static String get redirectUrl =>
      kIsWeb ? '${Uri.base.origin}${Uri.base.path}' : mobileRedirect;

  static Future<bool> signInWithGoogle() {
    return Supabase.instance.client.auth.signInWithOAuth(
      OAuthProvider.google,
      redirectTo: redirectUrl,
    );
  }
}
