import 'package:flutter/foundation.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

class AuthService {
  AuthService._();

  /// Deep link used to come back to the app on Android/iOS.
  /// It must be added to Supabase > Authentication > URL Configuration
  /// > Redirect URLs, and registered in AndroidManifest.xml / Info.plist.
  static const String mobileRedirect =
      'https://vxagataaejcqsrojdniw.supabase.co/auth/v1/callback';

  /// Opens the Google sign-in page. Returns false if the browser could not
  /// be opened. The sign-in itself completes later: listen to
  /// `onAuthStateChange` for `AuthChangeEvent.signedIn`.
  static Future<bool> signInWithGoogle() {
    return Supabase.instance.client.auth.signInWithOAuth(
      OAuthProvider.google,
      redirectTo: kIsWeb ? null : mobileRedirect,
    );
  }
}
