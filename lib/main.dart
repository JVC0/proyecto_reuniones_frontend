import 'package:material_ui/material_ui.dart';
import 'package:proyecto_empresa/features/views/loginScreen.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

Future<void> main() async {
  await Supabase.initialize(
    url: 'https://vxagataaejcqsrojdniw.supabase.co',
    publishableKey: 'sb_publishable_uLw1ATn9KgqiUN4SkAU3rg_A6TPsMeL',
  );
  runApp(MyApp());
}


class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: LoginPage(),
    );
  }
}
